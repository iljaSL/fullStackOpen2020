const anecdoteReducer = (state = [], action) => {
	switch (action.type) {
		case 'INITIALIZE_ANECDOTES':
			return action.data;
		case 'VOTE':
			const { id } = action.data;
			return state.map((anecdote) =>
				anecdote.id !== id
					? anecdote
					: { ...anecdote, votes: anecdote.votes + 1 }
			);
		case 'CREATE':
			return state.concat(action.data);
		default:
			return state;
	}
};

export const voteForAnecdotes = (id) => ({
	type: 'VOTE',
	data: {
		id,
	},
});

export const createAnecdote = (content) => ({
	type: 'CREATE',
	data: content,
});

export const initializeAnecdotes = (anecdotes) => ({
	type: 'INITIALIZE_ANECDOTES',
	data: anecdotes,
});

export default anecdoteReducer;
