import anecdoteService from '../services/anecdoteService';

const anecdoteReducer = (state = [], action) => {
	switch (action.type) {
		case 'INITIALIZE_ANECDOTES':
			return action.data;
		case 'VOTE':
			return state.map((anecdote) =>
				anecdote.id !== action.data.id
					? anecdote
					: { ...anecdote, votes: anecdote.votes + 1 }
			);
		case 'CREATE':
			return state.concat(action.data);
		default:
			return state;
	}
};

export const voteForAnecdotes = (anecdote) => {
	return async (dispatch) => {
		const voteAnecdote = await anecdoteService.updateVote(anecdote);
		dispatch({
			type: 'VOTE',
			data: voteAnecdote,
		});
	};
};

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
