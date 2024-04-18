import { IDockviewPanelProps } from 'dockview'

export default function ComponentChooser(props: IDockviewPanelProps) {
	return (
		<div>
			<ul>
				<li>
					<button
						onClick={() => {
							// add new panel
							props.containerApi.addPanel({
								id: `id_${Date.now().toString()}`,
								component: 'default',
								title: `Tab ${`id_${Date.now().toString()}`}`,
								position: {
									referenceGroup: props.api.group,
								},
							})

							// remove this panel
							props.api.close()
						}}
					>
						default
					</button>
				</li>
			</ul>
		</div>
	)
}
