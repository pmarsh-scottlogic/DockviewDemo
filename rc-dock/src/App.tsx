import DockLayout, { LayoutData } from 'rc-dock'
import 'rc-dock/dist/rc-dock.css'

function App() {
	const defaultLayout: LayoutData = {
		dockbox: {
			mode: 'horizontal',
			children: [
				{
					tabs: [
						{
							id: 'tab1',
							title: 'tab1',
							content: <div>Hello World</div>,
						},
					],
				},
			],
		},
	}

	return (
		<DockLayout
			defaultLayout={defaultLayout}
			style={{
				position: 'absolute',
				left: 10,
				top: 10,
				right: 10,
				bottom: 10,
			}}
		/>
	)
}

export default App
