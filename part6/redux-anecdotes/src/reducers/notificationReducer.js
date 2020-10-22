let timer;

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

export const setNotification = (message, sec) => {
	timer && clearTimeout(timer);
	return (dispatch) => {
		dispatch({
			type: 'SET_NOTIFICATION',
			data: {
				message,
			},
		});
		timer = setTimeout(() => {
			dispatch({
				type: 'CLEAR_NOTIFICATION',
			});
		}, sec * 1000);
	};
};

export default notificationReducer;
