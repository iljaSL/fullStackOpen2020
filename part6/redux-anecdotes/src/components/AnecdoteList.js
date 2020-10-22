import React from 'react';
import { connect } from 'react-redux';
import { voteForAnecdotes } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = ({
	anecdotes,
	filter,
	voteForAnecdotes,
	setNotification,
}) => {
	const vote = (anecdote) => {
		voteForAnecdotes(anecdote);
		setNotification(`you voted '${anecdote.content}'`, 20);
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

const mapStateToProps = (state) => {
	return {
		anecdotes: state.anecdotes,
		filter: state.filter,
	};
};

const mapDispatchToProps = {
	voteForAnecdotes,
	setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
