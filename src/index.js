import { Hono } from 'hono';

// export interface Env {
// 	// If you set another name in wrangler.toml as the value for 'binding',
// 	// replace "AI" with the variable name you defined.
// 	AI: Ai;
// }

const app = new Hono();

app.post('/', async (c) => {
	const { context, query } = await c.req.json();
	const responseBody = await c.env.AI.run('@cf/meta/llama-3-8b-instruct', {
		prompt: `${context} ${query}`,
	});

	// Ensure the response is a string or serializable object
	// const responseBody = JSON.stringify(aiResponse);

	// Return a Response object
	// return new Response(responseBody, {
	// 	headers: { 'Content-Type': 'application/json' },
	// });

	return c.json(responseBody);
});

// export default {
// 	async fetch(request, env): Promise<Response> {
// 		return new Response(JSON.stringify(response));
// 	},
// } satisfies ExportedHandler<Env>;

export default app;
