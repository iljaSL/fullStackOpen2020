import React, { useState } from 'react';
import loginService from '../services/login';

const LoginForm = ({ setUser, setNotification, setErrorMessage }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async event => {
        event.preventDefault();
        try {
            const user = await loginService.login({
                username,
                password,
            });
            setUsername('');
            setPassword('');
            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));
        } catch (exception) {
            setNotification(`wrong username or password`);
            setErrorMessage('error')
    }
}
return (
        <>
            <h2>log in to the application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='username'>Username: </label>
                    <input
                        type='text'
                        value={username}
                        name='Username'
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password: </label>
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
)
}

export default LoginForm;