import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userService from '../services/users';

const Users = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		userService
			.getAllUsers()
			.then(setUsers)
			.catch(() => {
				setUsers([]);
			});
	}, []);

	return (
		<div>
			<h2>users</h2>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>blogs created</th>
					</tr>
				</thead>

				<tbody>
					{users.map((user) => (
						<tr key={user.id}>
							<td>
								<Link
									to={{
										pathname: `/users/${user.id}`,
										state: user,
									}}>
									{user.name}
								</Link>
							</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Users;
