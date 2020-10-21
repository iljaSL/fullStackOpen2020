import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotification } from '../reducers/notificationReducer';

const Notification = () => {
	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1,
	};

	const notification = useSelector((state) => state.notification);
	const dispatch = useDispatch();
	useEffect(() => {
		if (notification) {
			const timer = setTimeout(() => {
				dispatch(clearNotification());
			}, 5000);
			return () => clearTimeout(timer);
		}
	});

	return notification && <div style={style}>{notification}</div>;
};

export default Notification;
