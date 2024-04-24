import DockLayout, { LayoutData } from 'rc-dock'
import 'rc-dock/dist/rc-dock.css'
import ListDisplayer from './Todolist/ListDisplayer/ListDisplayer'
import ItemAdder from './Todolist/ItemAdder/ItemAdder'

function App() {
	const defaultLayout: LayoutData = {
		dockbox: {
			mode: 'horizontal',
			children: [
				{
					mode: 'vertical',
					children: [
						{
							tabs: [
								{
									id: 'tab1',
									title: 'tab1',
									content: <ListDisplayer />,
								},
							],
						},
						{
							tabs: [
								{
									id: 'tab2',
									title: 'tab2',
									content: <ListDisplayer />,
								},
							],
						},
					],
				},
				{
					tabs: [
						{
							id: 'tab3',
							title: 'tab3',
							content: <ItemAdder />,
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
