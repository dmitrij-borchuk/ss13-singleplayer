export interface StaticObject extends ObjectDescriptor {
	x: number
	y: number
}
export interface ObjectDescriptor {
	id: string
	type: ObjectType
	tags: string[]
}

// TODO: name
export interface GameObjectConfig {
	id: string
	type: ObjectType
}

export type ObjectType = 'wall' | 'floor' | 'player' | 'door' | 'dirt' | 'mop'

export interface Coords {
	x: number
	y: number
}
