import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getProducts } from '../services/api.js';
import Rating from '../components/Rating.jsx';

export default function ProductsPages({
	search,
	changeItem,
	loading,
	changeLoading,
}) {
	const [searchParams] = useSearchParams();
	const [products, setProducts] = useState([]);
	const [noProducts, setNoProducts] = useState(false);
	const [categoryList, setCategoryList] = useState({});
	const query = searchParams.get('search') ?? '';
	const prevSearch = useRef('nosearch');
	const navigate = useNavigate();

	const handleCategory = items => {
		const categories = {};

		items.forEach(item => {
			if (categories[item.category]) {
				categories[item.category]++;
			} else {
				categories[item.category] = 1;
			}
		});

		setCategoryList(categories);
	};

	const handleChangeItem = item => {
		if (!item) return;
		changeItem(item);
		navigate(`/items/${item.id}`);
	};

	useEffect(() => {
		const fetching = async query => {
			if (query.length < 3 || search === prevSearch.current) return;
			prevSearch.current = search;
			setNoProducts(false);
			changeLoading(true);

			const res = await getProducts(query).catch(() => {
				return { result: false };
			});

			if (res.result) {
				setProducts(res.response);
				handleCategory(res.response);
			} else {
				setNoProducts(true);
			}
			changeLoading(false);
		};
		fetching(query);
	}, [search]);

	return (
		<>
			{loading ? (
				<h2 className='loading'>Cargando...</h2>
			) : noProducts ? (
				<h2>Artículo no encontrado</h2>
			) : (
				<>
					<div className='results-ctn'>
						<h2>Resultados: {products.length}</h2>
						{Object.entries(categoryList).map(([category, value]) => (
							<h2 key={category}>
								{category}: {value}
							</h2>
						))}
					</div>
					<ul className='products-ctn'>
						{products.map(item => {
							const desc = item.description.split(' ', 8).join(' ') + '...';

							return (
								<li key={item.id} onClick={() => handleChangeItem(item)}>
									<img
										src={item.thumbnail}
										alt={`Imagen del artículo ${item.title}`}
									/>
									<h4>Precio: ${item.price}</h4>
									<h2>{item.title}</h2>
									<h4>Descripción: {desc}</h4>
									<h4>Categoría: {item.category}</h4>
									<h4 className='rating'>
										<Rating {...item} />
									</h4>
								</li>
							);
						})}
					</ul>
				</>
			)}
		</>
	);
}
