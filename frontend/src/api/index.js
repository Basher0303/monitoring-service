import axios from 'axios';
import userAuthModule from './modules/user/auth';
const instance = axios.create({
	baseURL: 'http://localhost:4000/api',
	withCredentials: true,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'multipart/form-data'
	}
});


export default {
    user: {
        auth: userAuthModule(instance)
    },
	instance: instance
};
