import type { LayoutLoad } from './$types.js';

export const load = (async ({ params }) => {
	console.log('Loading blog post with slug:', { params });
	return {
		title: `Hello world! from ${params.slug}`,
		content: 'Welcome to our blog. Lorem ipsum dolor sit amet...',
		slug: params.slug
	};
}) satisfies LayoutLoad;

export const ssr = false;
