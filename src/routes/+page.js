import { queryPage } from '../sanity';

export async function load() {
	const data = await queryPage(`*[_type == "startPage"]`);
	console.log('DATA----->', data);

	if (data) {
		return data;
	}
	return {
		status: 500,
		body: new Error('Internal Server Error')
	};
}
