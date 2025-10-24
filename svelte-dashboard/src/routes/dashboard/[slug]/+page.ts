import type { PageLoad } from './$types.js';

export const load = (async ({ params }) => {
    console.log('Loading blog post with slug:', {params});
    return {
        title: `Hello world! from ${params.slug}`,
        content: 'Welcome to our blog. Lorem ipsum dolor sit amet...'
    };
}) satisfies PageLoad;



