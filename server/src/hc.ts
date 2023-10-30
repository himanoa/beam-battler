import { Hono } from 'hono'
import { version } from '../package.json'

export const hc = new Hono()

hc.get('/hc', async (c) => {
	return c.json({ version })
})

