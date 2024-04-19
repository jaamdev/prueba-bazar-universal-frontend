import { useState } from 'react';

export default function Slider(item) {
	const images = item.images ?? [];

	const [selectedIndex, setSelectedIndex] = useState(0);
	const [selectedImage, setSelectedImage] = useState(images[0]);
	const [loaded, setLoaded] = useState(false);

	const selectNewImage = (index, images, next = true) => {
		setLoaded(false);
		setTimeout(() => {
			const condition = next
				? selectedIndex < images.length - 1
				: selectedIndex > 0;
			const nextIndex = next
				? condition
					? selectedIndex + 1
					: 0
				: condition
					? selectedIndex - 1
					: images.length - 1;
			setSelectedImage(images[nextIndex]);
			setSelectedIndex(nextIndex);
		}, 500);
	};

	const previous = () => selectNewImage(selectedIndex, images, false);

	const next = () => selectNewImage(selectedIndex, images);

	return (
		<>
			<img
				className={loaded ? 'loaded' : ''}
				src={selectedImage}
				alt={`Imagen de un ${item.title}`}
				onLoad={() => setLoaded(true)}
			/>
			<button onClick={previous}>{`<`}</button>
			<button onClick={next}>{`>`}</button>
		</>
	);
}
