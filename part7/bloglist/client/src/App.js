import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';

import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';

const App = () => {
	const user = useSelector((state) => state.user);

	return (
		<div>
			<Notification />
			{user ? <Blogs user={user} /> : <LoginForm />}
		</div>
	);
};

export default App;
