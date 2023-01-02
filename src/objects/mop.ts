import { tileSize } from '../config'
import { MapScene } from '../scenes/map'
import { GameObject } from '../types/gameObject'

export class Mop extends Phaser.GameObjects.Image implements GameObject {
	constructor(scene: MapScene, x: number, y: number) {
		super(scene, x, y, 'mop')
		this.setDisplaySize(tileSize, tileSize)

		this.setInteractive()

		// sprite.on('pointerup', (e: any) => {
		// 	console.log('=-= e', e)
		// 	console.log('=-= player', this.scene.player)
		// 	const { worldX, worldY } = this.scene.game.input.mousePointer
		// 	const reachable = this.scene.player.isReachableDistance(worldX, worldY)
		// 	if (reachable) {
		// 		console.log('=-= reach')
		// 		// TODO: put into the inventory
		// 	}
		// })
	}

	// public action(items: Phaser.GameObjects.GameObject[]) {
	public action() {
		console.log('=-= action')
	}
}
