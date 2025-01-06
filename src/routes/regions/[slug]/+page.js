import { queryPage } from '../../../sanity';

export async function load({ params }) {
	const data = await queryPage(`*[_type == "region" && seo.slug.current == "${params.slug}"]{
    ...,
     "treks": *[_type == "trek" && details.region == "${params.slug}"]{
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
