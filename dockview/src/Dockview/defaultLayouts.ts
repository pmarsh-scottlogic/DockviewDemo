import { DockviewApi } from 'dockview'

const nextId = (() => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let counter = 0

	return () => {
		counter++
	}
})()

function complexConfig(api: DockviewApi) {
	const panel1 = api.addPanel({
		id: 'panel_1',
		component: 'default',
		renderer: 'always',
		title: 'Panel 1',
	})

	api.addPanel({
		id: 'panel_2',
		component: 'default',
		title: 'Panel 2',
		position: { referencePanel: panel1 },
	})

	api.addPanel({
		id: 'panel_3',
		component: 'default',
		title: 'Panel 3',
		position: { referencePanel: panel1 },
	})

	const panel4 = api.addPanel({
		id: 'panel_4',
		component: 'default',
		title: 'Panel 4',
		position: { referencePanel: panel1, direction: 'right' },
	})

	const panel5 = api.addPanel({
		id: 'panel_5',
		component: 'default',
		title: 'Panel 5',
		position: { referencePanel: panel4 },
	})

	const panel6 = api.addPanel({
		id: 'panel_6',
		component: 'default',
		title: 'Panel 6',
		position: { referencePanel: panel5, direction: 'below' },
	})

	const panel7 = api.addPanel({
		id: 'panel_7',
		component: 'default',
		title: 'Panel 7',
		position: { referencePanel: panel6, direction: 'left' },
	})

	api.addPanel({
		id: 'panel8',
		component: 'default',
		title: 'Panel 8',
		position: { referencePanel: panel7, direction: 'below' },
	})

	panel1.api.setActive()
}

function onePanelConfig(api: DockviewApi) {
	const panel1 = api.addPanel({
		id: 'panel_1',
		component: 'componentChooser',
		renderer: 'always',
		title: 'Panel 1',
	})

	panel1.api.setActive()
}

function todoSyncTest(api: DockviewApi) {
	const panel1 = api.addPanel({
		id: 'panel_1',
		component: 'todoListDisplayer',
		renderer: 'always',
		title: 'Panel 1',
	})

	api.addPanel({
		id: 'panel8',
		component: 'todoListDisplayer',
		title: 'Panel 8',
		position: { referencePanel: panel1, direction: 'right' },
	})

	panel1.api.setActive()
}

export { onePanelConfig, complexConfig, nextId, todoSyncTest }
