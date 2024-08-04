/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import {badgen} from 'badgen';

const authorWhitelist = ['itning'];

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		const params = url.searchParams;
		const user = params.get('u');
		const repo = params.get('r');
		if (!user || !repo) {
			return new Response(null, {status: 404});

		}
		if (!authorWhitelist.includes(user)) {
			return new Response(null, {status: 403});
		}
		if (repo.length > 30) {
			return new Response(null, {status: 400});
		}
		const key = `${user}-${repo}`;
		let num = 0;
		let value = await env.hit_count.get(key);
		if (!value) {
			num = 0;
		} else {
			num = parseInt(await value.text());
		}
		await env.hit_count.put(key, `${++num}`, {
			httpMetadata: {
				contentType: 'text/plain'
			}
		});

		// only `status` is required.
		const svgString = badgen({
			label: 'hit count',      // <Text>
			labelColor: '575757', // <Color RGB> or <Color Name> (default: '555')
			status: `${num}`,  // <Text>, required
			color: 'blue',     // <Color RGB> or <Color Name> (default: 'blue')
			style: 'flat',     // 'flat' or 'classic' (default: 'classic')
			//icon: 'data:image/svg+xml;base64,...', // Use icon (default: undefined)
			iconWidth: 13,     // Set this if icon is not square (default: 13)
			scale: 1           // Set badge scale (default: 1)
		});
		return new Response(svgString, {
			headers: {
				'pragma': 'no-cache',
				'expires': '0',
				'cache-control': 'no-cache, no-store, must-revalidate',
				'content-type': 'image/svg+xml'
			}
		});
	}
} satisfies ExportedHandler<Env>;
