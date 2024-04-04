export default function (instance) {
	return {
        create({name, roles}) {
			return instance.post('/dashboard', {
				name,
				roles: roles || [], 
				options: {
					timeUpdate: "300000",
					timeInterval: {
						start: "0",
						end: "0"
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
		update({id, options, name, roles}) {
			return instance.put('/dashboard', {id, options, name, roles});
		}
	};
}
