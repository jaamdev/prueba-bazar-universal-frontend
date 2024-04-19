import { useContext } from 'react';
import { CartContext } from '../contexts/cart.jsx';

export default function useCart() {
	const context = useContext(CartContext);

	if (context === undefined) {
		throw new Error('useCart debe estar dentro de CartProvider');
	}

	return context;
}
