import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [newBlog, setNewBlog] = useState('');
	const [showAll, setShowAll] = useState(true);
	const [errorMessage, setErrorMessage] = useState(true);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const loggedUserJson = window.localStorage.getItem('loggedBlogAppUser');
		if (loggedUserJson) {
			const user = JSON.parse(loggedUserJson);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	const handleLogin = async (event) => {
		event.preventDefault();
		console.log('loggin in with', username, password);

		try {
			const user = await loginService.login({
				username,
				password,
			});

			window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
			setUser(user);
			setUsername('');
			setPassword('');
		} catch (exception) {
			setErrorMessage('Wrong credentials');
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	const handleLogout = async (event) => {
		event.preventDefault();
		window.localStorage.removeItem('loggedBlogAppUser');
	};

	const loginForm = () => (
		<>
			<h2>log in to application</h2>
			<form onSubmit={handleLogin}>
				<div>
					username
					<input
						type='text'
						value={username}
						name='Username'
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						type='password'
						value={password}
						name='Password'
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type='submit'>login</button>
			</form>
		</>
	);

	// const blogForm = () => (
	// 	<form onSubmit={addBlog}>
	// 		<input value={newBlog} onChange={handleBlogChange} />
	// 		<button type='submit'>save</button>
	// 	</form>
	// );

	const showBlogs = () => {
		return (
			<div>
				<h2>blogs</h2>
				<p>
					{user.name} logged in <button onClick={handleLogout}> logout </button>
				</p>
				{blogs.map((blog) => (
					<Blog key={blog.id} blog={blog} />
				))}
			</div>
		);
	};

	return (
		<div>
			{user === null ? loginForm() : showBlogs()}

			{/* <form>
				<div>
					username
					<input
						type='text'
						value={username}
						name='Username'
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						type='password'
						value={password}
						name='Password'
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type='submit'>login</button>
			</form> */}
		</div>
	);
};

export default App;
