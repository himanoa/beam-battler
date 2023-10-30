import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';

import { hc } from './hc';

type Bindings = {
	ROOM: DurableObjectNamespace
}

const app = new Hono<{Bindings: Bindings}>();

app.use('*', prettyJSON());
app.use('*', logger());
app.use('*', cors());

app.route('/', hc);

app.all("/room/*", (c) => {
	const id = c.env.ROOM.idFromName("Room")
	const obj = c.env.ROOM.get(id)
	return obj.fetch(c.req.raw)
})

app.all('*', async (c) => {
	return c.json({}, 404);
});


export default app;
export * from './room-durable-object'
