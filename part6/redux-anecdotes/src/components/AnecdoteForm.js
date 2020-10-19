import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const create = (e) => {
		e.preventDefault();
		const content = e.target.anecdote.value;
		dispatch(createAnecdote(content));
		e.target.anecdote.value = '';
	};

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={create}>
				<div>
					<input name='anecdote' />
				</div>
				<button>create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
