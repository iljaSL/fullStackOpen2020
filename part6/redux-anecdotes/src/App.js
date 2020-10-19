import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteForAnecdotes } from './reducers/anecdoteReducer';
import { createAnecdote } from './reducers/anecdoteReducer';

const App = () => {
	const anecdotes = useSelector((state) => state);
	const dispatch = useDispatch();

	const vote = (id) => {
		dispatch(voteForAnecdotes(id));
	};

	const create = (e) => {
		e.preventDefault();
		const content = e.target.anecdote.value;
		dispatch(createAnecdote(content));
		e.target.anecdote.value = '';
	};

	return (
		<div>
			<h2>Anecdotes</h2>
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

export default App;
