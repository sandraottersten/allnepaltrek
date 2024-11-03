import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
	projectId: 'vp8oc1kx',
	dataset: 'production',
	apiVersion: '2024-11-03',
	useCdn: false
});

const queryPage = async (query) => {
	const result = await client.fetch(query);
	if (Array.isArray(result) && result.length !== 0) {
		return result[0];
	} else {
		throw Error('Page not found');
	}
};

const queryCollection = async (params, query) => {
	return await client.fetch(query, params);
};

// Get a pre-configured url-builder from sanity client
const builder = imageUrlBuilder(client);

const urlFor = (source) => {
	return builder.image(source);
};

export { queryPage, queryCollection, urlFor };
