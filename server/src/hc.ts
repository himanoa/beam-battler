import { Hono } from 'hono'
import { version } from '../package.json'

export const app = new Hono()

app.get('/hc', async (c) => {
	return c.json({ version })
})

