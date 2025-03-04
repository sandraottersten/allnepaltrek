import { queryPage } from '../../../sanity';

export async function load({ params }) {
	const data = await queryPage(`*[_type == "trek" && seo.slug.current == "${params.slug}"]{
    ...,
    'tours': combinedTours.tours[] {
        _type == 'reference' => {
        'seo': @->seo,
        'general': @->general,
        'details': @->details
      }
    },
  }`);

	if (data) {
		return data;
	}
	return {
		status: 500,
		body: new Error('Internal Server Error')
	};
}
