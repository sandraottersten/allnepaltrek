import { queryPage } from '../../sanity';

export async function load() {
	const data = await queryPage(`*[_type == "toursPage"]{
      ...,
      "tours": *[_type == "tour"]{
        seo,
        general,
        details
      },
      "categories": *[_type == "category"],
    }`);

	if (data) {
		return data;
	}
	return {
		status: 500,
		body: new Error('Internal Server Error')
	};
}
