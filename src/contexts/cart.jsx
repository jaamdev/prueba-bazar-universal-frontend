import { useState, createContext } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
	const [cart, setCart] = useState([]);

	const addToCart = item => {
		const itemInCart = cart.find(product => product.id === item.id);

		if (itemInCart !== undefined) return;

		const newCart = [item, ...cart];
		setCart(newCart);
	};

	const removeFromCart = item => {
		const newCart = cart.filter(product => product.id !== item.id);
		setCart(newCart);
	};

	const clearCart = () => setCart([]);

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				removeFromCart,
				clearCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}
