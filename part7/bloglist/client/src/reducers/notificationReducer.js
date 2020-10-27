const notificationReducer = (state = { message: null, type: '' }, action) => {
	switch (action.type) {
		case 'SET_NOTIFICATION':
			return {
				message: action.notificationReducer.message,
				type: action.notificationReducer.type,
			};
		default:
			return state;
	}
};

export const setNotification = (message, type) => ({
	type: 'SET_NOTIFICATION',
	notification: { message, type },
});

export default notificationReducer;
