import { tileSize } from '../config'
import { ObjectDescriptor } from '../types'
import { GameObject } from '../types/gameObject'
import attachControls from '../utils/attachControls'

const toolbarSize = 5
export class Player extends Phaser.GameObjects.Container {
	// private scene: Phaser.Scene
	public playerTexture: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
	private inventory: ObjectDescriptor[] = []
	private toolbar: ObjectDescriptor[] = []

	public activeTool: ObjectDescriptor | null = null

	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y)
		// this.scene = scene
		// const physicsObject = scene.physics.add.existing(this)
		this.setDisplaySize(tileSize, tileSize)
		// scene.physics.world.enable(this)
		// this.body.gameObject
		// this.body.physicsObject.setBodySize(
		// 	this.playerTexture.width * 0.6,
		// 	this.playerTexture.height * 0.6,
		// )
		console.log('=-= this', this)
		this.playerTexture = scene.physics.add
			.image(x, y, 'player')
			.setDisplaySize(tileSize, tileSize)

		this.playerTexture.setBodySize(
			this.playerTexture.width * 0.6,
			this.playerTexture.height * 0.6,
		)

		attachControls(scene, this.playerTexture.body)

		// keys = this.input.keyboard.addKeys('P,H,A,S,E,R');

		// scene.input.keyboard.addListener()
	}

	public addCollider(
		subject:
			| Phaser.GameObjects.GameObject
			| Phaser.GameObjects.GameObject[]
			| Phaser.GameObjects.Group
			| Phaser.GameObjects.Group[],
	) {
		this.scene.physics.add.collider(this.playerTexture, subject)
	}

	public tryPickUp(item: ObjectDescriptor) {
		this.addToInventory(item)

		return true
	}

	addToInventory(item: ObjectDescriptor) {
		this.inventory.push(item)
		if (this.toolbar.length < toolbarSize) {
			this.toolbar.push(item)
		}

		if (!this.activeTool) {
			this.activeTool = item
		}
	}
}
