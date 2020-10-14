import React, { useState } from 'react';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';

const App = () => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
	const [notification, setNotification] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	const notificationMessage = (text, type) => {
		setNotification(`${text}`);
		setErrorMessage(type);
		setTimeout(() => setNotification(null), 3000);

	};


	return (
		<div>
			<Notification notificationMessage={notificationMessage} message={notification} type={errorMessage} />
			{
				user ?
					<Blogs user={user} setUser={setUser} setNotification={setNotification} setErrorMessage={setErrorMessage} />
					: <LoginForm setUser={setUser} setNotification={setNotification} setErrorMessage={setErrorMessage} />
			}
		</div>
	);
};

export default App;
