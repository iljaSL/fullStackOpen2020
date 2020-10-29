import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlogInDb } from '../reducers/blogReducer';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

	const BlogFormSyled = styled.div`
		background: BurlyWood;
		padding: 1em;
	`;

	const StyledInput = styled.input`
		border: 1px solid #000;
		border-radius: 10px;
		padding: 10px;
		margin: 5px;
		width: 150px;
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
		<BlogFormSyled>
			<h2>create new</h2>
			<form onSubmit={createBlog}>
				<div>
					title:
					<StyledInput
						id='title'
						value={title}
						name='Title'
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author:
					<StyledInput
						id='author'
						value={author}
						name='Author'
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					url:
					<StyledInput
						id='url'
						value={url}
						name='URL'
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<div>
					<Button id='create-blog-button' type='submit'>
						create
					</Button>
				</div>
			</form>
		</BlogFormSyled>
	);
};

BlogForm.propTypes = {
	user: PropTypes.object.isRequired,
	hideBlogForm: PropTypes.func.isRequired,
};

export default BlogForm;
