import React, { useState } from 'react';

const Blog = ({ blog }) => {
	const [visibility, setVisibility] = useState(false);
	const toggleVisibility = () => {
		setVisibility(!visibility);
	};

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		width: 270,
		borderWidth: 1,
		marginBottom: 5,
	};

	return (
		<div style={blogStyle}>
			{blog.title} by {blog.author} {console.log(blog.user.name)}
			<button onClick={toggleVisibility}>{visibility ? 'hide' : 'view'}</button>
			{visibility && (
				<div>
					<p>
						link:
						<a href={blog.url} target='_blank' rel='noopener noreferrer'>
							{blog.url}
						</a>
					</p>
					<p>
						likes 0 <button>like</button>
					</p>
					<p>posted by {blog.user.name}</p>
				</div>
			)}
			<br />
		</div>
	);
};

export default Blog;
