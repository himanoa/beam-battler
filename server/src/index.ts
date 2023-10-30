import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';

import { hc } from './hc';

const app = new Hono();

app.use('*', prettyJSON());
app.use('*', logger());
app.use('*', cors());

app.get('*', async (c) => {
	return c.json({}, 404);
});

app.route('/', hc);

export default app;
