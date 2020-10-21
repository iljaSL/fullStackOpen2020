import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteForAnecdotes } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
	const anecdotes = useSelector((state) => state.anecdotes);
	const filter = useSelector((state) => state.filter);
	const dispatch = useDispatch();

	const vote = ({ id, content }) => {
		dispatch(voteForAnecdotes(id));
		dispatch(setNotification(`you voted '${content}'`));
	};

	return (
		<div>
			{[]
				.concat(anecdotes)
				.filter((anecdote) =>
					anecdote.content.toLowerCase().includes(filter.toLowerCase())
				)
				.sort((first, second) => second.votes - first.votes)
				.map((anecdote) => (
					<div key={anecdote.id}>
						<div>{anecdote.content}</div>
						<div>
							has {anecdote.votes}
							<button onClick={() => vote(anecdote)}>vote</button>
						</div>
					</div>
				))}
		</div>
	);
};

export default AnecdoteList;
