import {
	DockviewDefaultTab,
	DockviewReact,
	DockviewReadyEvent,
	IDockviewPanelHeaderProps,
	DockviewApi,
} from 'dockview'
import './app.scss'
import { onePanelConfig } from './Dockview/defaultLayouts'
import { GlobalActions } from './Dockview/GlobalActions'
import { PanelActions } from './Dockview/panelActions'
import { GroupActions } from './Dockview/groupActions'
import {
	LeftControls,
	PrefixHeaderControls,
	RightControls,
} from './Dockview/GroupHeaderControls'
import { useState } from 'react'
import { components } from './Dockview/Components'

const headerComponents = {
	default: (props: IDockviewPanelHeaderProps) => {
		const onContextMenu = (event: React.MouseEvent) => {
			event.preventDefault()
			alert('context menu')
		}
		return <DockviewDefaultTab onContextMenu={onContextMenu} {...props} />
	},
}

const App = (props: { theme?: string }) => {
	const [dockviewApi, setDockviewApi] = useState<DockviewApi>()

	const [panelIds, setPanelIds] = useState<string[]>([])
	const [groupIds, setGroupIds] = useState<string[]>([])
	const [activePanelId, setActivePanelId] = useState<string>()
	const [activeGroupId, setActiveGroupId] = useState<string>()

	const onReady = (event: DockviewReadyEvent) => {
		setDockviewApi(event.api)

		function onlyUnique<T>(value: T, index: number, array: T[]) {
			return array.indexOf(value) === index
		}

		event.api.onDidAddPanel((event) => {
			setPanelIds((panelIds) =>
				[...panelIds, event.id].filter(onlyUnique)
			)
		})
		event.api.onDidActivePanelChange((event) => {
			setActivePanelId(event?.id)
		})
		event.api.onDidRemovePanel((event) => {
			setPanelIds((panelIds) => {
				const next = [...panelIds]
				next.splice(
					next.findIndex((x) => x === event.id),
					1
				)

				return next
			})
		})

		event.api.onDidAddGroup((event) => {
			setGroupIds((groupIds) =>
				[...groupIds, event.id].filter(onlyUnique)
			)
		})

		event.api.onDidRemoveGroup((event) => {
			setGroupIds((groupIds) => {
				const next = [...groupIds]
				next.splice(
					next.findIndex((x) => x === event.id),
					1
				)

				return next
			})
		})

		event.api.onDidActiveGroupChange((event) => {
			setActiveGroupId(event?.id)
		})

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

		onePanelConfig(event.api)
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
				<GlobalActions api={dockviewApi} />
				{true && ( //hidden for now
					<>
						<PanelActions
							api={dockviewApi}
							panels={panelIds}
							activePanel={activePanelId}
						/>
						<GroupActions
							api={dockviewApi}
							groups={groupIds}
							activeGroup={activeGroupId}
						/>
					</>
				)}
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

export default App
