import React from 'react';
import { useField } from '../hooks';

const Comment = () => {
	const [comment] = useField('text');

	const handleSubmit = (event) => {};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<input {...comment} />
				</div>
				<button type='submit'>add comment</button>
			</form>
		</div>
	);
};

export default Comment;
