import './App.css';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home.jsx';
import { CartButton, CartPage } from './pages/Cart.jsx';
import ProductsPage from './pages/Products.jsx';
import ProductPage from './pages/Product.jsx';
import Header from './components/Header.jsx';
import Search from './components/Search.jsx';

export default function App() {
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState('');
	const [item, setItem] = useState([]);

	const changeLoading = value => setLoading(value);
	const changeSearch = search => setSearch(search);
	const changeItem = item => setItem(item);

	return (
		<main>
			<Header />
			<CartButton />
			<Search changeSearch={changeSearch} />

			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/cart' element={<CartPage />} />
				<Route
					path='/items'
					element={
						<ProductsPage
							search={search}
							changeItem={changeItem}
							loading={loading}
							changeLoading={changeLoading}
						/>
					}
				/>
				<Route
					path='/items/:id'
					element={<ProductPage item={item} changeItem={changeItem} />}
				/>
			</Routes>
		</main>
	);
}
