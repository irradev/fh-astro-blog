
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from "markdown-it";


const parser = new MarkdownIt();
export const GET = (async ({ params, request, site }) => {

    const blogPosts = await getCollection('blog');

    return rss({
        stylesheet: '/styles/rss.xsl',
        // `<title>` field in output xml
        title: 'irra\'s Blog',
        // `<description>` field in output xml
        description: 'A humble Astronaut’s guide to the stars',

        xmlns: {
            media: 'http://search.yahoo.com/mrss/',
        },
        // Pull in your project "site" from the endpoint context
        // https://docs.astro.build/en/reference/api-reference/#site
        site: site ?? 'no-site-url', // context.site
        // Array of `<item>`s in output xml
        // See "Generating items" section for examples using content collections and glob imports
        items: blogPosts.map(({ data: post, id: slug, body }) => ({
            title: post.title,
            description: post.description,
            pubDate: post.date,
            link: `/posts/${slug}`,

            content: sanitizeHtml(parser.render(body!), {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
            }),

            customData: `<media:content
    type="image/${post.image.format === 'jpg' ? 'jpeg' : 'png'}"
    width="${post.image.width}"
    height="${post.image.height}"
    medium="image"
    url="${site + post.image.src}" />
`,
        })),
        // (optional) inject custom xml
        customData: `<language>en-mx</language>`,
    });
}) satisfies APIRoute;