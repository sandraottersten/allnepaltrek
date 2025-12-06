import { queryPage } from '../../../sanity';

export async function load({ params }) {
	const data = await queryPage(`*[_type == "tour" && seo.slug.current == "${params.slug}"]{
    ...,
    'details': details {
      ...,
      region-> {
        "title": general.title
      }
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
