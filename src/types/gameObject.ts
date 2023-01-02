export interface GameObject extends Phaser.GameObjects.GameObject {
	isSolid?: boolean
	isConstruction?: boolean
	use?: () => void
	action?: () => void
	onContact?: () => string
}
