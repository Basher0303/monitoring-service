export default function (instance) {
	return {
		getInCollection({id, start, end}) {
			return instance.get('/metric/list/' + id, {
				params: {
					start,
					end
				}
			});
		},
	};
}
