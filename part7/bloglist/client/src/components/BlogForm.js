import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlogInDb } from '../reducers/blogReducer';
import PropTypes from 'prop-types';

const BlogForm = ({ user, hideBlogForm }) => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');

	const dispatch = useDispatch();

	const createBlog = async (event) => {
		event.preventDefault();
		dispatch(createBlogInDb({ title, author, url }, user.token));
		hideBlogForm();
		setTitle('');
		setAuthor('');
		setUrl('');
	};

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={createBlog}>
				<div>
					title:
					<input
						id='title'
						value={title}
						name='Title'
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author:
					<input
						id='author'
						value={author}
						name='Author'
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					url:
					<input
						id='url'
						value={url}
						name='URL'
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<div>
					<button id='create-blog-button' type='submit'>
						create
					</button>
				</div>
			</form>
		</div>
	);
};

BlogForm.propTypes = {
	user: PropTypes.object.isRequired,
	hideBlogForm: PropTypes.func.isRequired,
};

export default BlogForm;
