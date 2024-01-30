export default function (instance) {
	return {
		getInCollection({id}) {
			return instance.get('/metric/list/' + id);
		},
	};
}
