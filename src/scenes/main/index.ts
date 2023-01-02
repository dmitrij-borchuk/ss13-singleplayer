import store from '../../store'

export class MainScene extends Phaser.Scene {
	private store = store

	constructor() {
		super('main')
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
		this.store.subscribe(() => this.stateUpdated())
		this.stateUpdated()

		this.scene.run('map')
		this.scene.run('hud')
	}
	stateUpdated() {
		const newState = this.store.getState()

		console.log('=-= paused', newState.game.paused)
	}
}
