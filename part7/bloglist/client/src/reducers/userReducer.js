import loginService from '../services/login';
import { setNotification } from './notificationReducer';

const userReducer = (
	state = JSON.parse(localStorage.getItem('user')),
	action
) => {
	switch (action.type) {
		case 'SET_USER':
			return action.user;
		default:
			return state;
	}
};

export const setUser = (user) => ({
	type: 'SET_USER',
	user,
});

export const logInUser = (user) => {
	return async (dispatch) => {
		try {
			const loggedInUser = await loginService.login(user);
			dispatch(setUser(loggedInUser));
			localStorage.setItem('user', JSON.stringify(loggedInUser));
		} catch (error) {
			dispatch(setNotification(error.response.data.error, 'error'));
		}
	};
};

export default userReducer;
