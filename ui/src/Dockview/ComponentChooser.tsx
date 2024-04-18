import { IDockviewPanelProps } from 'dockview'
import { components } from './Components'
import { TodoApi } from '../App'

export default function ComponentChooser(props: IDockviewPanelProps) {
	const componentsToExclude = ['componentChooser', 'default']
	const componentsToChoose = Object.keys(components({} as TodoApi)).filter(
		(component) => !componentsToExclude.includes(component)
	)
	return (
		<div>
			<ul>
				{componentsToChoose.map((component) => (
					<li key={`option-${component}`}>
						<button
							onClick={() => {
								// add new panel
								props.containerApi.addPanel({
									id: `id_${Date.now().toString()}`,
									component: component,
									title: `Tab ${`id_${Date.now().toString()}`}`,
									position: {
										referenceGroup: props.api.group,
									},
								})

								// remove this panel
								props.api.close()
							}}
						>
							{component}
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}
