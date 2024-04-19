const URL = import.meta.env.VITE_API;

export const getProducts = async search => {
	try {
		const response = await fetch(`${URL}/api/items?q=${search}`);

		const result = await response.json();

		return result;
	} catch (error) {
		throw new Error(error);
	}
};

export const getProduct = async id => {
	try {
		const response = await fetch(`${URL}/api/items/${id}`);

		const result = await response.json();

		return result;
	} catch (error) {
		throw new Error(error);
	}
};
