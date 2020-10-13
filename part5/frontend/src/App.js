import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import LoginForm from "./components/LoginForm";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [newBlog, setNewBlog] = useState('');
	const [user, setUser] = useState(null);
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');
	const [notification, setNotification] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

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

	const notificationMessage = (text, type) => {
		setNotification(`${text}`);
		setErrorMessage(type);
		setTimeout(() => setNotification(null), 3000);
		setNewBlog('');
		setAuthor('');
	};

	const handleLogin = async ({ username, password }) => {
		try {
			const user = await loginService.login({
				username,
				password,
			});

			window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
			setUser(user);
		} catch (exception) {
			notificationMessage(`wrong username or password`, 'error');
			console.log(exception);
		}
	};

	const handleLogout = async (event) => {
		event.preventDefault();
		window.localStorage.removeItem('loggedBlogAppUser');
	};

	const handleCreationOfBlog = async (event) => {
		event.preventDefault();

		try {
			const newBlogPost = { title, author, url };
			await blogService.postBlog(newBlogPost);
			notificationMessage(`A new blog ${title} by ${author} added`, 'ok');
		} catch (error) {
			console.log(error);
		}
	};

	const loginForm = () => {
		return (
			<Togglable label="log in">
				<LoginForm handleLogin={handleLogin} />
			</Togglable>
		);
	};

	const blogForm = () => (
		<div>
			<form onSubmit={handleCreationOfBlog}>
				<div>
					<div>
						title
						<input
							type='text'
							value={title}
							name='Title'
							onChange={({ target }) => setTitle(target.value)}
						/>
					</div>
					<div>
						author
						<input
							type='text'
							value={author}
							name='Title'
							onChange={({ target }) => setAuthor(target.value)}
						/>
					</div>
					<div>
						url
						<input
							type='text'
							value={url}
							name='Title'
							onChange={({ target }) => setUrl(target.value)}
						/>
					</div>
				</div>
				<button type='submit'>create</button>
			</form>
		</div>
	);

	const showBlogs = () => {
		return (
			<div>
				<h2>blogs</h2>
				<p>
					{user.name} logged in <button onClick={handleLogout}> logout </button>
				</p>
				<h2>create new</h2>
				{blogForm()}
				{blogs.map((blog) => (
					<Blog key={blog.id} blog={blog} />
				))}
			</div>
		);
	};

	return (
		<div>
			<Notification message={notification} type={errorMessage} />
			{user ? showBlogs() : loginForm() }
		</div>
	);
};

export default App;
