import { queryPage } from '../sanity';

export async function load() {
	const data = await queryPage(`*[_type == "navigation"]{
    ...,
    'treks': treks {
      ...,
      "links": links[] {
        ...,
        "region": region {
          ...,
          _type == 'reference' => {
            ...,
          'id': @->id,
          "treks": *[_type == "trek" && details.region._ref == ^._ref]{
          "title": general.navigation,
          "slug": seo.slug.current
          }
          }
        }
      }
    },
    'regions': regions {
      ...,
      "links": links[] {
        title,
        region {
          _type == 'reference' => {
          'slug': @->seo.slug.current,
          }
        }
      }
    },
    'tours': tours {
      ...,
      "links": links[] {
        ...,
        "tours": *[_type == "tour" && details.category == ^.id]{
        "title": general.title,
        "slug": seo.slug.current
        }
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
