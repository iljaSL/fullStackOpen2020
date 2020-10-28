import React from 'react';
import { useHistory } from 'react-router-dom';

const User = () => {
	const history = useHistory();
	const user = history.location.state;

	return (
		<div>
			<h2>{user.name}</h2>
			{user.blogs.length > 0 ? (
				<>
					<h3>added blogs:</h3>
					<ul>
						{user.blogs.map((blog) => (
							<li key={blog.id}>{blog.title}</li>
						))}
					</ul>
				</>
			) : (
				<div>nothing yet.</div>
			)}
		</div>
	);
};

export default User;
