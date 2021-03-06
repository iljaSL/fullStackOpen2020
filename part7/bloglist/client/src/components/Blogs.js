import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BlogForm from './BlogForm';
import Togglable from './Togglable';
import { getAllBlogsFromDb } from '../reducers/blogReducer';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Blogs = ({ user }) => {
	const BlogsStyle = styled.div`
		background: BurlyWood;
		padding: 1em;
	`;

	const blogs = useSelector((state) => state.blogs);
	const dispatch = useDispatch();
	const blogFormRef = useRef();

	useEffect(() => {
		dispatch(getAllBlogsFromDb());
	}, [dispatch]);

	const hideBlogForm = () => {
		blogFormRef.current.toggleVisibility();
	};

	const blogStyle = {
		padding: 10,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	};

	return (
		<BlogsStyle>
			<h2>blogs</h2>
			<Togglable label='Create new blog' ref={blogFormRef}>
				<BlogForm user={user} hideBlogForm={hideBlogForm} />
			</Togglable>
			<div id='blogs'>
				{[]
					.concat(blogs)
					.sort((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes)
					.map((blog) => (
						<div key={blog.id} style={blogStyle}>
							<Link to={`/blogs/${blog.id}`}>
								{blog.title} by {blog.author}
							</Link>
						</div>
					))}
			</div>
		</BlogsStyle>
	);
};

Blogs.propTypes = {
	user: PropTypes.object.isRequired,
};

export default Blogs;
