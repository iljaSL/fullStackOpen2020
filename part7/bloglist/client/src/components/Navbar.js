import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../reducers/userReducer';
import styled from 'styled-components';

const Navbar = ({ user }) => {
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(setUser(null));
		localStorage.clear();
	};

	const Navigation = styled.div`
		background: BurlyWood;
		padding: 1em;
	`;

	const Page = styled.div`
		padding: 1em;
		background: papayawhip;

		a {
			padding-right: 20px;
		}
	`;

	const Button = styled.button`
		background: Bisque;
		font-size: 1em;
		margin: 1em;
		padding: 0.25em 1em;
		border: 2px solid Chocolate;
		border-radius: 3px;
	`;

	return (
		<Page>
			<Navigation>
				<NavLink to='/blogs'>Blogs</NavLink>
				<NavLink to='/users'>Users</NavLink>
				<div>{user.name} logged in</div>
				<Button id='logout-button' onClick={handleLogout}>
					logout
				</Button>
			</Navigation>
		</Page>
	);
};

export default Navbar;
