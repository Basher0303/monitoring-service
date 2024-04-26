export default function (instance) {
	return {
		getAllUsers() {
			return instance.get('/admin/all-users');
		},
		editUser({user, roles}) {
			return instance.post('/admin/edit-user', {
				user, roles
			});
		},
	};
}
