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
import { TodoItem } from './Todolist/types'
import PLACEHOLDER_TODO_ITEMS from './Todolist/placeholderItems'

const headerComponents = {
	default: (props: IDockviewPanelHeaderProps) => {
		const onContextMenu = (event: React.MouseEvent) => {
			event.preventDefault()
			alert('context menu')
		}
		return <DockviewDefaultTab onContextMenu={onContextMenu} {...props} />
	},
}

export type TodoApi = {
	todoItems: TodoItem[]
	toggleTodoItemCompleteness: (title: string) => void
	addTodoItemToList: (newItem: TodoItem) => void
}

const App = (props: { theme?: string }) => {
	// ========== todo list stuff ==========
	const [todoItems, setTodoItems] = useState<TodoItem[]>(
		PLACEHOLDER_TODO_ITEMS
	)

	function toggleTodoItemCompleteness(title: string) {
		console.log('toggling completeness of ', title)
		setTodoItems((todoItems) =>
			todoItems.map((todoItem) =>
				todoItem.title === title
					? { ...todoItem, complete: !todoItem.complete }
					: todoItem
			)
		)
	}

	function addTodoItemToList(newItem: TodoItem) {
		setTodoItems((todoItems) => [...todoItems, newItem])
	}

	const todoApi: TodoApi = {
		todoItems,
		toggleTodoItemCompleteness,
		addTodoItemToList,
	}

	// dockview stuff
	const [dockviewApi, setDockviewApi] = useState<DockviewApi>()

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
		setDockviewApi(event.api)

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
				<GlobalActions api={dockviewApi} />
				{false && ( //hidden for now
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
					components={components(todoApi)}
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
