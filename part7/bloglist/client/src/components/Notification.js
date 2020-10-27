import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';

const Notification = () => {
	const { message, type } = useSelector((state) => state.notification);
	const dispatch = useDispatch();

	useEffect(() => {
		if (message) {
			const timer = setTimeout(() => {
				dispatch(setNotification(null, ''));
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [message, dispatch]);

	return message ? <div className={type}>{message}</div> : null;
};

export default Notification;
