import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import Users from './components/Users';
import User from './components/User';
import Navbar from './components/Navbar';

const App = () => {
	const user = useSelector((state) => state.user);
	const getUsers = useSelector((state) => state.users);

	return (
		<div>
			<Notification />
			{user ? (
				<BrowserRouter>
					<Navbar user={user} />
					<Switch>
						<Route exact path={['/', '/blogs']}>
							<Blogs user={user} />
						</Route>
						<Route exact path='/users'>
							<Users />
						</Route>
						<Route exact path='/blogs/:blogId' component={Blog} />
						<Route path='/users/:userId'>
							<User users={getUsers} />
						</Route>
					</Switch>
				</BrowserRouter>
			) : (
				<LoginForm />
			)}
		</div>
	);
};

export default App;
