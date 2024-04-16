import {
	DockviewDefaultTab,
	DockviewReact,
	DockviewReadyEvent,
	IDockviewPanelHeaderProps,
	IDockviewPanelProps,
	DockviewApi,
} from 'dockview'
import * as React from 'react'
import './app.scss'
import { defaultConfig } from './defaultLayout'
import { GridActions } from './gridActions'
import { PanelActions } from './panelActions'
import { GroupActions } from './groupActions'
import { LeftControls, PrefixHeaderControls, RightControls } from './controls'

const components = {
	default: (props: IDockviewPanelProps) => {
		return (
			<div
				style={{
					height: '100%',
					overflow: 'auto',
					color: 'white',
					position: 'relative',
				}}
			>
				{/* <Table data={metadata} /> */}
				<span
					style={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%,-50%)',
						pointerEvents: 'none',
						fontSize: '42px',
						opacity: 0.5,
					}}
				>
					{props.api.title}
				</span>
			</div>
		)
	},
	iframe: () => {
		return (
			<iframe
				style={{
					width: '100%',
					height: '100%',
				}}
				src="https://dockview.dev"
			/>
		)
	},
}

const headerComponents = {
	default: (props: IDockviewPanelHeaderProps) => {
		const onContextMenu = (event: React.MouseEvent) => {
			event.preventDefault()
			alert('context menu')
		}
		return <DockviewDefaultTab onContextMenu={onContextMenu} {...props} />
	},
}

const DockviewDemo = (props: { theme?: string }) => {
	const [api, setApi] = React.useState<DockviewApi>()

	console.log('update values')
	const panelIds = api?.panels.map((panel) => panel.id) ?? []
	const groupIds = api?.groups.map((group) => group.id) ?? []
	const activePanelId = api?.activePanel?.id
	const activeGroupId = api?.activeGroup?.id

	const onReady = (event: DockviewReadyEvent) => {
		setApi(event.api)

		// set event methods here. E.g:
		// event.api.onDidAddPanel((event) => {
		// 	console.log('Panel added', event.id)
		// 	addLogLine(`Panel Added ${event.id}`)
		// })

		// populate panels and groups from localStorage or defaultLayout

		console.log('loading state...')

		const state = localStorage.getItem('dv-demo-state')
		if (state) {
			try {
				event.api.fromJSON(JSON.parse(state))
				console.log('Dockview state loaded from localStorage')
				return
			} catch {
				localStorage.removeItem('dv-demo-state')
				console.log(
					'There was a problem loading Dockview state from localStorage'
				)
			}
			return
		}

		defaultConfig(event.api)
		console.log('Dockview state loaded from defaultConfig')
	}

	return (
		<div
			style={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				flexGrow: 1,
				padding: '8px',
				backgroundColor: 'rgba(0,0,50,0.25)',
				borderRadius: '8px',
			}}
		>
			<div>
				<GridActions api={api} />
				<PanelActions
					api={api}
					panels={panelIds}
					activePanel={activePanelId}
				/>
				<GroupActions
					api={api}
					groups={groupIds}
					activeGroup={activeGroupId}
				/>
			</div>
			<div
				style={{
					flexGrow: 1,
					overflow: 'hidden',
					height: 0,
					display: 'flex',
				}}
			>
				<DockviewReact
					components={components}
					defaultTabComponent={headerComponents.default}
					rightHeaderActionsComponent={RightControls}
					leftHeaderActionsComponent={LeftControls}
					prefixHeaderActionsComponent={PrefixHeaderControls}
					onReady={onReady}
					className={props.theme || 'dockview-theme-abyss'}
				/>
			</div>
		</div>
	)
}

export default DockviewDemo
