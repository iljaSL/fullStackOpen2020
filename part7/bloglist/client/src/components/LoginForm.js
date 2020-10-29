import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logInUser } from '../reducers/userReducer';
import styled from 'styled-components';

const LoginForm = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();

	const handleLogin = (event) => {
		event.preventDefault();
		dispatch(logInUser({ username, password }));
	};

	const StyledLogin = styled.div`
		display: flex;
		align-items: center;
		flex-flow: column;
		width: 400px;
		height: 200px;
		margin: 0 auto;
		border: 2px solid #000;
		border-radius: 20px;
		background: #eee;

		h2 {
			font-family: Arial, Helvetica, sans-serif;
			font-size: 14px;
		}
		button {
			background: green;
			color: #fff;
			padding: 10px;
			margin: 5px;
			width: 150px;
			border: none;
			border-radius: 10px;
			box-sizing: border-box;
		}
	`;

	const StyledInput = styled.input`
		border: 1px solid #000;
		border-radius: 10px;
		padding: 10px;
		margin: 5px;
		width: 150px;
		box-sizing: border-box;
	`;

	return (
		<StyledLogin>
			<h2>log in to the application</h2>
			<form id='login-form' onSubmit={handleLogin}>
				<div>
					<label>Username: </label>
					<StyledInput
						id='username'
						type='text'
						value={username}
						name='Username'
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					<label>Password: </label>
					<StyledInput
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
		</StyledLogin>
	);
};

export default LoginForm;
