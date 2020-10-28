import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import Blog from './components/Blog';

const App = () => {
	const user = useSelector((state) => state.user);

	return (
		<div>
			<Notification />
			{user ? (
				<BrowserRouter>
					<Switch>
						<Route exact path={['/', '/blogs']}>
							<Blogs user={user} />
						</Route>

						<Route exact path='/blogs/:blogId' component={Blog} />
					</Switch>
				</BrowserRouter>
			) : (
				<LoginForm />
			)}
		</div>
	);
};

export default App;
