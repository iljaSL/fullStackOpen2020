const filterReducer = (state = '', action) => {
	switch (action.type) {
		case 'FILTER':
			return action.data.searchText;
		default:
			return state;
	}
};

export const setFilter = (searchText) => ({
	type: 'FILTER',
	data: {
		searchText,
	},
});

export default filterReducer;
