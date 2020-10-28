import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../reducers/userReducer';

const Navbar = ({ user }) => {
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(setUser(null));
		localStorage.clear();
	};

	return (
		<div>
			<NavLink to='/blogs'>Blogs</NavLink>
			<NavLink to='/users'>Users</NavLink>
			<div>{user.name} logged in</div>
			<button id='logout-button' onClick={handleLogout}>
				logout
			</button>
		</div>
	);
};

export default Navbar;
