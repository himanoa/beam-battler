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

	app.post("", (c) => {
		console.log('succ')
		return c.text("succ")
		return c.json({}, 200)
		console.log('x')
		const uuid = crypto.randomUUID().replaceAll("-", "")
		console.log(uuid)
		return c.json({}, 200)
		const id = scrambler.scramble(BigInt(parseInt(uuid, 16)))
		return c.json({ roomId: id.toString() }, 200)
		console.log(id)
		storage.put<Room>(id.toString(), { participant: [] })
		console.log(id)
		return c.json({ roomId: id.toString() }, 200)
	})
})
