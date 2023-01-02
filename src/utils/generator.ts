import { nanoid } from '@reduxjs/toolkit'
import { Coords, StaticObject } from '../types'

export function generateWorld(): StaticObject[] {
	const world: StaticObject[] = [
		...generateRoom(0, 0, 4, 4, [{ x: 2, y: 0 }]),
		...generateRoom(0, -5, 4, -1, [{ x: 2, y: -1 }]),
		{
			id: nanoid(),
			type: 'dirt',
			x: 2,
			y: -3,
			tags: ['clearable'],
		},
		{
			id: nanoid(),
			type: 'mop',
			x: 1,
			y: 1,
			tags: ['wet', 'cleaner'],
		},
		{
			id: nanoid(),
			x: 2,
			y: 2,
			type: 'player',
			tags: [],
		},
	]

	return world
}

export function generateRoom(
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	doors: Coords[] = [],
): StaticObject[] {
	const rect = makeRectangle(x1, y1, x2, y2)
	const leftTop = {
		x: x1,
		y: y1,
	}
	const bottomRight = {
		x: x2,
		y: y2,
	}
	const room: StaticObject[] = rect.map((item) => {
		const isDoor = doors.find((d) => d.x === item.x && d.y === item.y)
		const type =
			isWall(leftTop, bottomRight, item) && !isDoor ? 'wall' : 'floor'

		return {
			id: nanoid(),
			type,
			x: item.x,
			y: item.y,
			tags: [],
		}
	})

	doors.forEach((d) => {
		room.push({
			id: nanoid(),
			type: 'door',
			x: d.x,
			y: d.y,
			tags: [],
		})
	})

	return room
}

export function isCenter(leftTop: Coords, bottomRight: Coords, item: Coords) {
	const centerX = Math.round(bottomRight.x - leftTop.x)
	const centerY = Math.round(bottomRight.y - leftTop.y)

	return item.x === centerX && item.y === centerY
}

export function isWall(leftTop: Coords, bottomRight: Coords, item: Coords) {
	if (item.x === leftTop.x || item.x === bottomRight.x) {
		return true
	}
	if (item.y === leftTop.y || item.y === bottomRight.y) {
		return true
	}

	return false
}

export function makeRectangle(x1: number, y1: number, x2: number, y2: number) {
	const items: Coords[] = []

	for (let x = x1; x <= x2; x++) {
		for (let y = y1; y <= y2; y++) {
			items.push({
				x,
				y,
			})
		}
	}

	return items
}
