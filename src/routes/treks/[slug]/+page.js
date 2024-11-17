import { queryPage } from '../../../sanity';

export async function load({ params }) {
	console.log('PARAM', params.slug);

	const data = await queryPage(`*[_type == "trek" && seo.slug.current == "${params.slug}"]`);

	console.log('DATA----->', data);

	if (data) {
		return data;
	}
	return {
		status: 500,
		body: new Error('Internal Server Error')
	};
}
