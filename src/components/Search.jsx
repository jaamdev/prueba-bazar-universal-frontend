import { useNavigate } from 'react-router-dom';

export default function Search({ changeSearch }) {
	const navigate = useNavigate();

	const handleSubmit = e => {
		e.preventDefault();
		const input = e.target?.search.value;

		if (input.length < 3) return;
		changeSearch(input);
		navigate(`/items?search=${input}`);
	};

	return (
		<form autoComplete='off' onSubmit={e => handleSubmit(e)}>
			<input
				spellCheck
				type='text'
				name='search'
				placeholder='Samsung, smartphones...'
			/>
			<input type='submit' value='Buscar' />
		</form>
	);
}
