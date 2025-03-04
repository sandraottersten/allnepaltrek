import { queryPage } from '../sanity';

export async function load() {
	const data = await queryPage(`*[_type == "startPage"]{
    ...,
    infoCard {
      ...,
      link {
        linkText,
        page-> {'slug': seo.slug.current}
      }
    },
    'treks': treks[] {
        _type == 'reference' => {
        'seo': @->seo,
        'general': @->general,
        'details': @->details
      }
    },
    "regions": *[_type == "region"]{
      seo,
      general,
      id,
      topTrek
    },
    "categories": *[_type == "category"],
    "tours": *[_type == "tour"]
  }`);

	if (data) {
		return data;
	}
	return {
		status: 500,
		body: new Error('Internal Server Error')
	};
}
