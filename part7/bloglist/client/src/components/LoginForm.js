import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logInUser } from '../reducers/userReducer';

const LoginForm = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();

	const handleLogin = (event) => {
		event.preventDefault();
		dispatch(logInUser({ username, password }));
	};

	return (
		<>
			<h2>log in to the application</h2>
			<form id='login-form' onSubmit={handleLogin}>
				<div>
					<label htmlFor='username'>Username: </label>
					<input
						id='username'
						type='text'
						value={username}
						name='Username'
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					<label htmlFor='password'>Password: </label>
					<input
						id='password'
						type='password'
						value={password}
						name='Password'
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button id='login-button' type='submit'>
					login
				</button>
			</form>
		</>
	);
};

export default LoginForm;
