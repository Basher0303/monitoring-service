export default function (instance) {
	return {
		getAll() {
			return instance.get('/role');
		},
		create({name}) {
			return instance.post('/role', {
                name,
            }); 
		},
	};
}
