import { queryPage } from '../../../sanity';

export async function load({ params }) {
	const data = await queryPage(`*[_type == "region" && seo.slug.current == "${params.slug}"]{
    ...,
     "treks": *[_type == "trek" && references(^._id)]{
      seo,
      general,
      details
      },
     "tours": *[_type == "tour" && references(^._id)]{
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
