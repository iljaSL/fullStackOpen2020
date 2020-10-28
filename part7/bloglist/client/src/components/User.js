import React from 'react';
import { useHistory } from 'react-router-dom';

const User = () => {
	const history = useHistory();
	const user = history.location.state;

	return (
		<div>
			<h2>{user.name}</h2>
			<h3>added blogs:</h3>
			{user.blogs.map((blog) => (
				<li>{blog.title}</li>
			))}
		</div>
	);
};

export default User;
