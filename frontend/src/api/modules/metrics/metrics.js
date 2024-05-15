export default function (instance) {
	return {
		getInCollection({id, start, end, filter}) {
			return instance.get('/metric/list/' + id, {
				params: {
					start,
					end,
					filter
				}
			});
		},
	};
}
