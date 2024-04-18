import {
	DockviewDefaultTab,
	DockviewReact,
	DockviewReadyEvent,
	IDockviewPanelHeaderProps,
	IDockviewPanelProps,
	DockviewApi,
} from 'dockview'
import './app.scss'
import { onePanelConfig } from './Dockview/defaultLayouts'
import { MainActions } from './Dockview/mainActions'
import { PanelActions } from './Dockview/panelActions'
import { GroupActions } from './Dockview/groupActions'
import {
	LeftControls,
	PrefixHeaderControls,
	RightControls,
} from './Dockview/controls'
import { useState } from 'react'

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
	const [api, setApi] = useState<DockviewApi>()

	const [panelIds, setPanelIds] = useState<string[]>([])
	const [groupIds, setGroupIds] = useState<string[]>([])
	const [activePanelId, setActivePanelId] = useState<string>()
	const [activeGroupId, setActiveGroupId] = useState<string>()

	// I thought I could deduce these from the api state object. But they don't stay in sync when the Dock view updates (new panel/group added or deleted or selected)
	// const panelIds = api?.panels.map((panel) => panel.id) ?? []
	// const groupIds = api?.groups.map((group) => group.id) ?? []
	// const activePanelId = api?.activePanel?.id
	// const activeGroupId = api?.activeGroup?.id

	const onReady = (event: DockviewReadyEvent) => {
		setApi(event.api)

		// set event methods here. E.g:

		event.api.onDidAddPanel((event) => {
			setPanelIds((panelIds) => [...panelIds, event.id])
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
			setGroupIds((groupIds) => [...groupIds, event.id])
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
				<MainActions api={api} />
				{false && ( //hidden for now
					<>
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

export default DockviewDemo
