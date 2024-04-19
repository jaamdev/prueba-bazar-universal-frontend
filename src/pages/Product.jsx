import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../services/api.js';
import useCart from '../hooks/useCart.js';
import Slider from '../components/Slider.jsx';
import Rating from '../components/Rating.jsx';

export default function ProductPage({ item, changeItem }) {
	const { cart, addToCart, removeFromCart } = useCart();
	const [noProducts, setNoProducts] = useState(false);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		const fetching = async id => {
			if (!id || Number(id) === item.id) {
				setLoading(false);
				return;
			}
			setLoading(true);
			setNoProducts(false);
			const res = await getProduct(id).catch(() => {
				return { result: false };
			});

			if (res.result) {
				changeItem(res.response);
			} else {
				setNoProducts(true);
			}
			setLoading(false);
		};
		fetching(id);
	}, []);

	return (
		<>
			{loading ? (
				<h2 className='loading'>Cargando...</h2>
			) : noProducts ? (
				<h2>Artículo no encontrado</h2>
			) : (
				<div className='item-ctn'>
					<div className='btn-ctn'>
						<button onClick={() => navigate(-1)}>{'<< Volver'}</button>
						{cart.some(product => product.id === item.id) ? (
							<button
								className='btn-removeFromCart'
								onClick={() => removeFromCart(item)}
							>
								Quitar
							</button>
						) : (
							<button className='btn-addToCart' onClick={() => addToCart(item)}>
								Añadir
							</button>
						)}
					</div>
					<div className='img-ctn'>
						<Slider {...item} />
					</div>
					<div className='info-ctn'>
						<h2>Precio: {item.price}$</h2>
						<h2>Nombre:</h2>
						<h3>{item.title}</h3>
						<h2>Descripción:</h2>
						<h3>{item.description}</h3>
						<h2>Fabricante:</h2>
						<h3>{item.brand}</h3>
						<h2 className='rating'>
							<Rating {...item} />
						</h2>
					</div>
				</div>
			)}
		</>
	);
}
