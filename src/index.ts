import init from './game'

initWorkspace()
init()

function initWorkspace() {
	const element = document.createElement('div')
	element.id = 'applicationRoot'
	document.body.appendChild(element)

	const style = document.createElement('style')
	style.innerHTML = `
		body, html {
			margin: 0;
			height: 100%;
			width: 100%;
			overflow: hidden;
		}
	`
	document.body.appendChild(style)

	// if (environment === 'development') {
	// 	const saveButton = document.createElement('button')
	// 	saveButton.innerHTML = 'Save'
	// 	// saveButton.addEventListener('click')
	// 	document.body.appendChild(saveButton)
	// 	const loadButton = document.createElement('button')
	// 	loadButton.innerHTML = 'Load'
	// 	document.body.appendChild(loadButton)
	// }
}
