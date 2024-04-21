import axios from 'axios';
import userAuthModule from './modules/user/auth';
import mecticsCollectionsModule from './modules/metrics/collections';
import mecticsModule from './modules/metrics/metrics';
import dashboardModule from './modules/dashboard/dashboard';
import rolesModule from './modules/roles/roles';
import adminModule from './modules/admin/admin';

const instance = axios.create({
	baseURL: 'http://localhost:4000/api',
	withCredentials: true,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'multipart/form-data'
	}
});

instance.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})

instance.interceptors.response.use((config) => {
	return config
}, async (error) => {
	const originalConfig = error.config;
	if(originalConfig.url != '/auth/refresh' && error.response.status == 401 && !originalConfig?._isRetry) {
		originalConfig._isRetry = true;
		try {
			const fetchData = (await userAuthModule(instance).refreshToken()).data
			localStorage.setItem('token', fetchData.accessToken)
			return instance.request(originalConfig)
		} catch (error) {
			console.log(error)
		}
	}
	throw error
	
})

export default {
    user: {
        auth: userAuthModule(instance)
    },
	metrics: {
		collections: mecticsCollectionsModule(instance),
		metrics: mecticsModule(instance),
	},
	roles: rolesModule(instance),
	admin: adminModule(instance),
	dashboard: dashboardModule(instance),
	instance: instance
};
