import React, { useState } from 'react';

const Blog = ({ blog }) => {
	const [visibility, setVisibility] = useState(false);
	const toggleVisibility = () => {
		setVisibility(!visibility);
	};

	return (
		<>
			{blog.title} {blog.author}{' '}
			<button onClick={toggleVisibility}>{visibility ? 'Hide' : 'View'}</button>
			{visibility && (
				<div>
					<p>
						link:{' '}
						<a href={blog.url} target='_blank' rel='noopener noreferrer'>
							{blog.url}
						</a>
					</p>
				</div>
			)}
			<br />
		</>
	);
};

export default Blog;
