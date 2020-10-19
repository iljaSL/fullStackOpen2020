import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteForAnecdotes } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
	const anecdotes = useSelector((state) => state);
	const dispatch = useDispatch();

	const vote = (id) => {
		dispatch(voteForAnecdotes(id));
	};

	return (
		<div>
			{[]
				.concat(anecdotes)
				.sort((first, second) => second.votes - first.votes)
				.map((anecdote) => (
					<div key={anecdote.id}>
						<div>{anecdote.content}</div>
						<div>
							has {anecdote.votes}
							<button onClick={() => vote(anecdote.id)}>vote</button>
						</div>
					</div>
				))}
		</div>
	);
};

export default AnecdoteList;
