import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateBlogInDb, removeBlogFromDb } from '../reducers/blogReducer';
import PropTypes from 'prop-types';

const Blog = ({ match }) => {
	const { blogId } = match.params;

	const blogs = useSelector((state) => state.blogs);
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const [blog, setBlog] = useState(null);

	useEffect(() => {
		setBlog(blogs.find((blog) => blog.id === blogId));
	}, [blogs, blogId]);

	return blog ? (
		<div className='blog'>
			<div className={'blog-heading'}>
				{blog.title} by {blog.author}
			</div>
			<div className='blog-details'>
				<p>
					link:
					<a href={blog.url} target='_blank' rel='noopener noreferrer'>
						{blog.url}
					</a>
				</p>
				<p>
					likes {blog.likes}{' '}
					<button
						className='like-button'
						onClick={() => dispatch(updateBlogInDb(blog))}>
						like
					</button>
				</p>
				<p>posted by {blog.user.name}</p>
				{blog.user.username === user.username && (
					<button
						id='remove-button'
						onClick={() => dispatch(removeBlogFromDb(blog.id, user.token))}>
						Remove
					</button>
				)}
			</div>
		</div>
	) : null;
};

Blog.propTypes = {
	match: PropTypes.object.isRequired,
};

export default Blog;
