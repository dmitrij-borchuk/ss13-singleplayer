import * as Phaser from 'phaser'
import { HUDScene } from './scenes/hud'
import { MainScene } from './scenes/main'
import { MapScene } from './scenes/map'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: '100%',
	height: '100%',
	backgroundColor: '#fac24f',
	parent: 'applicationRoot',
	scene: [MainScene, MapScene, HUDScene],
	physics: {
		default: 'arcade',
		arcade: {
			debug: false,
		},
	},

	scale: {
		mode: Phaser.Scale.FIT,
		parent: 'phaser-example',
		width: '100%',
		height: '100%',
	},
}

export default function init() {
	return new Phaser.Game(config)
}
