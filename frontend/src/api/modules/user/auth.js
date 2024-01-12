export default function (instance) {
	return {
		login({email, password}) {
			return instance.post('/auth/login', {
                email,
                password
            });
		},
		registration({email, password}) {
			return instance.post('/auth/registration', {
                email,
                password
            }); 
		},
		logout() {
			return instance.post('/auth/logout'); 
		},
		refreshToken() {
			return instance.get('/auth/refresh');
		}
	};
}
