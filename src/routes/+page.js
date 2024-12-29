import { queryPage } from '../sanity';

export async function load() {
	const data = await queryPage(`*[_type == "startPage"]{
    ...,
    'treks': treks[] {
        _type == 'reference' => {
        'seo': @->seo,
        'general': @->general,
        'details': @->details
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
