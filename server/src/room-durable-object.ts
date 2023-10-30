import { generateHonoObject } from "hono-do";
import { createScrambler } from '@kanamone/scrambler'

type Room  = {
	participant: readonly string[]
}

export const Room = generateHonoObject("/room", async (app, state) => {
	const { storage } = state

	const scrambler = createScrambler({
		digits: 4,
		n1: BigInt(8901),
		n2: BigInt(1101),
		seed: 12311231231,
		stages: 100
	})

	app.get("/", (c) => {
		console.dir('x')
		const id = scrambler.scramble(BigInt(parseInt(crypto.randomUUID().replaceAll("-", ""), 10)))
		storage.put<Room>(id.toString(), { participant: [] })
		return c.json({ roomId: id.toString() }, 200)
	})
	app.post("/", (c) => {
		console.dir('x')
		const id = scrambler.scramble(BigInt(parseInt(crypto.randomUUID().replaceAll("-", ""), 10)))
		console.dir('xxx')
		storage.put<Room>(id.toString(), { participant: [] })
		return c.json({ roomId: id.toString() }, 200)
	})
})
