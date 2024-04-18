import { DockviewApi } from 'dockview'
import { complexConfig, nextId } from './defaultLayouts'
import { useState } from 'react'

export const GlobalActions = (props: { api?: DockviewApi }) => {
	const [showHeaders, setShowHeaders] = useState(true)

	function toggleShowHeaders() {
		setShowHeaders((showHeaders) => !showHeaders)
		const nextShowHeaders = !showHeaders
		props.api?.groups.forEach(
			(group) => (group.header.hidden = !nextShowHeaders)
		)
	}

	const onClear = () => {
		props.api?.clear()
	}

	const onLoad = () => {
		const state = localStorage.getItem('dv-demo-state')
		if (state) {
			try {
				props.api?.fromJSON(JSON.parse(state))
			} catch {
				localStorage.removeItem('dv-demo-state')
			}
		}
	}

	const onSave = () => {
		if (props.api) {
			localStorage.setItem(
				'dv-demo-state',
				JSON.stringify(props.api.toJSON())
			)
		}
	}

	const onReset = () => {
		if (props.api) {
			props.api.clear()
			complexConfig(props.api)
		}
	}

	const onAddPanel = () => {
		props.api?.addPanel({
			id: `id_${Date.now().toString()}`,
			component: 'default',
			title: `Tab ${nextId()}`,
		})
	}

	const onAddGroup = () => {
		props.api?.addGroup()
	}

	return (
		<div className="action-container">
			<button className="text-button" onClick={onAddPanel}>
				Add Panel
			</button>
			<button className="text-button" onClick={onAddGroup}>
				Add Group
			</button>
			<button className="text-button" onClick={onClear}>
				Clear
			</button>
			<button className="text-button" onClick={onLoad}>
				Load
			</button>
			<button className="text-button" onClick={onSave}>
				Save
			</button>
			<button className="text-button" onClick={onReset}>
				Reset
			</button>
			<label>
				Show headers
				<input
					type="checkbox"
					defaultChecked={showHeaders}
					onChange={toggleShowHeaders}
				/>
			</label>
		</div>
	)
}
