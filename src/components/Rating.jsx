export default function Rating(props) {
	const { rating } = props;

	const result = [];
	for (let i = 0; i < Math.floor(rating); i++) {
		result.push('★');
	}

	return (
		<>
			Valoración: <span>{result}</span>
		</>
	);
}
