export default function (instance) {
	return {
        create({name, roles}) {
			return instance.post('/dashboard', {
				name,
				roles: roles || [], 
				options: {
					timeUpdate: "300000",
					timeInterval: {
						start: null,
						end: null
					},
					cards: []
				}
			});
		},
		get({id}) {
			return instance.get('/dashboard/single/' + id);
		},
		getList() {
			return instance.get('/dashboard/list');
		},
        delete({id}) {
			return instance.delete('/dashboard/' + id);
		},
		update({id, name, roles}) {
			return instance.put('/dashboard/update', {id, name, roles});
		},
		updateOptions({id, options}) {
			return instance.put('/dashboard/update-options', {id, options});
		}
	};
}
