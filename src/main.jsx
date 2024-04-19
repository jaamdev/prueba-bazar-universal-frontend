import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { CartProvider } from './contexts/cart.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<StrictMode>
		<CartProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</CartProvider>
	</StrictMode>,
);
