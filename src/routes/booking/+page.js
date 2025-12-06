import { queryCollection } from '../../sanity';

export async function load() {
	const query = `{
    "tours": *[_type == "tour"]{
      "title": general.title,
      "slug": seo.slug.current,
      "value": seo.slug.current,
      "label": general.title
    },
    "treks": *[_type == "trek"]{
      "title": general.title,
      "slug": seo.slug.current,
      "value": seo.slug.current,
      "label": general.title
    }
  }`;
	
	const data = await queryCollection({}, query);

	if (data) {
		return data;
	}
	return {
		status: 500,
		body: new Error('Internal Server Error')
	};
}

