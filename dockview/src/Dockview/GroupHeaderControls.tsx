import { IDockviewHeaderActionsProps } from 'dockview'
import { nextId } from './defaultLayouts'
import { useEffect, useState } from 'react'

const IconButton = (props: {
	icon: string
	title?: string
	onClick?: (event: React.MouseEvent) => void
}) => {
	return (
		<button title={props.title} className="action" onClick={props.onClick}>
			<span
				style={{ fontSize: 'inherit' }}
				className="material-symbols-outlined"
			>
				{props.icon}
			</span>
		</button>
	)
}

export const RightControls = (props: IDockviewHeaderActionsProps) => {
	const [isMaximized, setIsMaximized] = useState<boolean>(
		props.containerApi.hasMaximizedGroup()
	)

	const [isPopout, setIsPopout] = useState<boolean>(
		props.api.location.type === 'popout'
	)

	useEffect(() => {
		const disposable = props.containerApi.onDidMaximizedGroupChange(() => {
			setIsMaximized(props.containerApi.hasMaximizedGroup())
		})

		const disposable2 = props.api.onDidLocationChange(() => {
			setIsPopout(props.api.location.type === 'popout')
		})

		return () => {
			disposable.dispose()
			disposable2.dispose()
		}
	}, [props.api, props.containerApi])

	const toggleGroupIsMaximised = () => {
		if (props.containerApi.hasMaximizedGroup()) {
			props.containerApi.exitMaximizedGroup()
		} else {
			props.activePanel?.api.maximize()
		}
	}

	const toggleGroupIsPopout = () => {
		if (props.api.location.type !== 'popout') {
			props.containerApi.addPopoutGroup(props.group)
		} else {
			props.api.moveTo({ position: 'right' })
		}
	}

	return (
		<div
			className="group-control"
			style={{
				display: 'flex',
				alignItems: 'center',
				padding: '0px 8px',
				height: '100%',
				color: 'var(--dv-activegroup-visiblepanel-tab-color)',
			}}
		>
			<IconButton
				title={isPopout ? 'Close Window' : 'Open In New Window'}
				icon={isPopout ? 'close_fullscreen' : 'open_in_new'}
				onClick={toggleGroupIsPopout}
			/>
			{!isPopout && (
				<IconButton
					title={isMaximized ? 'Minimize View' : 'Maximize View'}
					icon={isMaximized ? 'collapse_content' : 'expand_content'}
					onClick={toggleGroupIsMaximised}
				/>
			)}
		</div>
	)
}

export const LeftControls = (props: IDockviewHeaderActionsProps) => {
	const addNewPanel = () => {
		props.containerApi.addPanel({
			id: `id_${Date.now().toString()}`,
			component: 'default',
			title: `Tab ${nextId()}`,
			position: {
				referenceGroup: props.group,
			},
		})
	}

	return (
		<div
			className="group-control"
			style={{
				display: 'flex',
				alignItems: 'center',
				padding: '0px 8px',
				height: '100%',
				color: 'var(--dv-activegroup-visiblepanel-tab-color)',
			}}
		>
			<IconButton onClick={addNewPanel} icon="add" />
		</div>
	)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PrefixHeaderControls = (_props: IDockviewHeaderActionsProps) => {
	return (
		<div
			className="group-control"
			style={{
				display: 'flex',
				alignItems: 'center',
				padding: '0px 8px',
				height: '100%',
				color: 'var(--dv-activegroup-visiblepanel-tab-color)',
			}}
		>
			{/* <IconButton icon="Menu" /> */}
		</div>
	)
}
