import { queryPage } from '../../sanity';

export async function load() {
	const data = await queryPage(`*[_type == "treksPage"]{
      ...,
      "treks": *[_type == "trek"]{
        seo,
        general,
        details
      }
    }`);

	if (data) {
		return data;
	}
	return {
		status: 500,
		body: new Error('Internal Server Error')
	};
}
