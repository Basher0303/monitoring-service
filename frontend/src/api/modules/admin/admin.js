export default function (instance) {
	return {
		getAllUsers() {
			return instance.get('/admin/all-users');
		},
	};
}
