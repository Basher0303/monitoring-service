export default function (instance) {
	return {
        create({roles, options}) {
			return instance.post('/dashboard', {roles, options});
		},
		get({id}) {
			return instance.get('/dashboard/' + id);
		},
        delete({id}) {
			return instance.delete('/dashboard/' + id);
		},
		update({id, options, name, roles}) {
			return instance.put('/dashboard', {id, options, name, roles});
		}
	};
}
