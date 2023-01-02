import { tileSize } from '../../config'
import { Mop } from '../../objects/mop'
import { Player } from '../../objects/player'
import store from '../../store'
import { GameObject } from '../../types/gameObject'

const maxDistanceToInteract = 2 * tileSize

export class MapScene extends Phaser.Scene {
	private store = store
	public player!: Player
	private interactiveObjects: Phaser.GameObjects.GameObject[] = []

	constructor() {
		super('map')
	}

	preload() {
		this.load.image('wall', 'assets/wall.png')
		this.load.image('floor', 'assets/floor32.png')
		this.load.image('player', 'assets/human.png')
		this.load.image('dirt', 'assets/dirt.png')
		this.load.image('mop', 'assets/mop.png')
	}

	create() {
		// // Interactions
		// setupKeyboardInput(this)
		// setupMouseInput(this)
		// // Setup column UI and then "reset" to the current state
		// const state = this.store.getState()
		// this.columns = state.columns.map((c, i) => new Column(this, i))
		// this.columns.forEach(c => this.add.existing(c))
		// resetSelection(this, state)
		// // Start listening for changes
		// this.store.subscribe(() => this.stateUpdated())
		this.initItems()

		if (!this.player) {
			throw new Error('We can\t run game without player')
		}

		this.input.keyboard.on('keyup-E', this.onUsePressed.bind(this))
	}

	initItems() {
		const state = this.store.getState()
		// const center = {
		// 	x: Math.round(this.scale.width / 2),
		// 	y: Math.round(this.scale.height / 2),
		// }
		const solidObjects = this.physics.add.staticGroup()

		state.map.objects.forEach((item) => {
			const x = item.x * tileSize
			const y = item.y * tileSize

			// Player
			if (item.type === 'player') {
				// const c = this.add.container(x, y)
				this.player = new Player(this, x, y)
				this.player.addCollider(solidObjects)
				return
			}

			// Walls
			if (item.type === 'wall') {
				const object = solidObjects
					.create(x, y, item.type)
					.setDisplaySize(tileSize, tileSize)
					.refreshBody()
				object.setData('link', item)

				return
			}

			// Doors
			if (item.type === 'door') {
				// solidObjects
				// 	.create(x, y, item.type)
				// 	.setDisplaySize(tileSize, tileSize)
				// 	.refreshBody()

				return
			}

			// Mop
			if (item.type === 'mop') {
				const object = new Mop(this, x, y)
				this.interactiveObjects.push(object)
				this.add.existing(object)
				object.setData('tags', item.tags)
				object.setData('link', item)

				// this.add.existing(new Phaser.GameObjects.Image(this, x, y, 'mop'))

				// const sprite = this.add.image(x, y, 'mop')
				// sprite.setDisplaySize(tileSize, tileSize)
				// sprite.setInteractive()
				// this.interactiveObjects.push(object)
				// if (object.isSolid) {
				// 	solidObjects.
				// 	GameObject
				// }

				return
			}

			const sprite = this.add
				.image(x, y, item.type)
				.setDisplaySize(tileSize, tileSize)
			sprite.setInteractive()
			sprite.setData('tags', item.tags)
			sprite.setData('link', item)

			sprite.on('pointerup', (pointer: Phaser.Input.Pointer) => {
				if (!this.isReachableDistance(pointer.worldX, pointer.worldY)) {
					return
				}

				console.log('=-= sprite.getData(tags)', sprite.getData('tags'))
				const tool = this.player.activeTool
				console.log('=-= 🚀 ~ MapScene ~ sprite.on ~ tool', tool)
				const toolTags = tool?.tags || []
				console.log('=-= 🚀 ~ MapScene ~ sprite.on ~ toolTags', toolTags)
				if (
					sprite.getData('tags').includes('clearable') &&
					toolTags.includes('cleaner') &&
					toolTags.includes('wet')
				) {
					sprite.destroy()
				}
			})
		})
	}

	private onUsePressed() {
		const pointer = this.input.activePointer
		if (!this.isReachableDistance(pointer.worldX, pointer.worldY)) {
			return
		}

		const array = this.input.manager.hitTest(
			pointer,
			this.interactiveObjects,
			this.cameras.main,
		) as GameObject[]
		const [firstHit] = array

		// console.log('=-= array', array)
		const obj = firstHit?.getData('link')
		console.log('=-= 🚀 ~ MapScene ~ onUsePressed ~ obj', obj)

		if (obj && this.player.tryPickUp(obj)) {
			firstHit.destroy()
			console.log('=-= destroyed')
			// firstHit.parentContainer.remove(firstHit)
		}
	}

	public isReachableDistance(x: number, y: number) {
		const distance = Phaser.Math.Distance.BetweenPoints(
			this.player.playerTexture.body,
			{
				x,
				y,
			},
		)
		return distance <= maxDistanceToInteract
	}
}
