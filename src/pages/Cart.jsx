import { useState } from 'react';
import useCart from '../hooks/useCart.js';
import { Link } from 'react-router-dom';
import { CartIcon } from '../components/Icons.jsx';

export function CartButton() {
	const [active, setActive] = useState(false);

	return !active ? (
		<Link className='cart-btn' to='/cart' onClick={() => setActive(true)}>
			<CartIcon />
		</Link>
	) : (
		<Link className='cart-btn' to={-1} onClick={() => setActive(false)}>
			<CartIcon />
		</Link>
	);
}

export function CartPage() {
	const { cart, removeFromCart } = useCart();
	let priceTotal = 0;
	cart.map(item => (priceTotal += item.price));

	return (
		<>
			<div className='total-ctn'>
				<h2>
					{cart.length === 0 ? (
						'El carrito está vacío'
					) : (
						<>
							{cart.length} {cart.length > 1 ? 'artículos' : 'artículo'} por{' '}
							{priceTotal}$
						</>
					)}
				</h2>
				<button
					onClick={() => alert(`¡La compra se realizó con éxito!`)}
					disabled={cart.length === 0}
				>
					Comprar
				</button>
			</div>
			<ul className='cart-ctn'>
				{cart.map(item => (
					<li key={item.id}>
						<img src={item.thumbnail} alt={`Imagen de ${item.title}`} />
						<div>
							<h2>Precio:</h2>
							<h3>${item.price}</h3>
							<h2>Nombre:</h2>
							<h3>{item.title}</h3>
						</div>
						<button
							className='btn-removeItem'
							title='Eliminar de la lista'
							onClick={() => removeFromCart(item)}
						>
							X
						</button>
					</li>
				))}
			</ul>
		</>
	);
}
