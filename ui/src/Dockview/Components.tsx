import { IDockviewPanelProps } from 'dockview'
import ComponentChooser from './ComponentChooser'

export const components = {
	componentChooser: ComponentChooser,
	default: ComponentChooser,
	boringPanel: (props: IDockviewPanelProps) => {
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
