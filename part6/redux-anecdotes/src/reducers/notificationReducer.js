const notificationReducer = (state = null, action) => {
	switch (action.type) {
		case 'SET_NOTIFICATION':
			return action.data.message;
		case 'CLEAR_NOTIFICATION':
			return null;
		default:
			return state;
	}
};

export const setNotification = (message) => ({
	type: 'SET_NOTIFICATION',
	data: {
		message,
	},
});

export const clearNotification = () => ({
	type: 'CLEAR_NOTIFICATION',
});

export default notificationReducer;
