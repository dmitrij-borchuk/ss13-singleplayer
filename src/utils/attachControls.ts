export default function attachControls(
	scene: Phaser.Scene,
	target: Phaser.Physics.Arcade.Body,
) {
	const cursors = scene.input.keyboard.createCursorKeys()
	const keys: any = scene.input.keyboard.addKeys('W,A,S,D')
	scene.cameras.main.startFollow(target, true, 0.5, 0.5)

	scene.events.on('update', () => {
		// console.log('=-= 🚀 ~ scene.events.on ~ target', target)
		target.setVelocity(0)
		if (cursors.left.isDown || keys.A.isDown) {
			target.setVelocityX(-500)
		} else if (cursors.right.isDown || keys.D.isDown) {
			target.setVelocityX(500)
		}
		if (cursors.up.isDown || keys.W.isDown) {
			target.setVelocityY(-500)
		} else if (cursors.down.isDown || keys.S.isDown) {
			target.setVelocityY(500)
		}
	})
}
