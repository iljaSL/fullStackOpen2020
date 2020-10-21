import anecdoteService from '../services/anecdoteService';

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

export const createAnecdote = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdoteService.createNewAnecdote({
			content,
			votes: 0,
		});
		dispatch({
			type: 'CREATE',
			data: newAnecdote,
		});
	};
};

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll();
		dispatch({
			type: 'INITIALIZE_ANECDOTES',
			data: anecdotes,
		});
	};
};

export default anecdoteReducer;
