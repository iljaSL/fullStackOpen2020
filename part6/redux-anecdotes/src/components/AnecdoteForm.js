import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdoteService';

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const create = async (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = '';

		const newAnecdote = await anecdoteService.createNewAnecdote({
			content,
			votes: 0,
		});
		dispatch(createAnecdote(newAnecdote));
		dispatch(setNotification(`you created '${content}'`));
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
