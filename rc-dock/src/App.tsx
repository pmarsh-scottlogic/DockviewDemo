import DockLayout, { LayoutBase, LayoutData } from 'rc-dock'
import 'rc-dock/dist/rc-dock.css'
import ListDisplayer from './Todolist/ListDisplayer/ListDisplayer'
import ItemAdder from './Todolist/ItemAdder/ItemAdder'
import { useRef } from 'react'

const groups = {
	allowWindow: {
		floatable: true,
		newWindow: true,
		maximizable: true,
	},
}

function App() {
	const dockLayoutRef = useRef<DockLayout>(null)

	function SaveLoad() {
		return (
			<>
				<button
					onClick={() => {
						const savedLayout = dockLayoutRef.current?.saveLayout()
						const stringVersion = JSON.stringify(
							savedLayout,
							undefined,
							2
						)
						console.log(stringVersion)
					}}
				>
					print
				</button>
				<button
					onClick={() => {
						const savedLayout = dockLayoutRef.current?.saveLayout()
						const stringVersion = JSON.stringify(
							savedLayout,
							undefined,
							2
						)
						localStorage.setItem('savedLayout', stringVersion)
					}}
				>
					save
				</button>
				<button
					onClick={() => {
						const stringLayout = localStorage.getItem('savedLayout')
						if (!stringLayout) return
						const objVersion = JSON.parse(
							stringLayout
						) as LayoutBase
						dockLayoutRef.current?.loadLayout(objVersion)
					}}
				>
					load
				</button>
			</>
		)
	}

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
						{
							id: 'popouts',
							title: 'popouts',
							content: <ListDisplayer />,
						},
					],
				},
				{
					tabs: [
						{
							id: 'saveload',
							title: 'saveload',
							content: <SaveLoad />,
						},
					],
				},
			],
		},
		floatbox: {
			mode: 'float',
			children: [
				{
					tabs: [
						{
							id: 'float',
							title: 'float',
							content: <ListDisplayer />,
							group: 'allowWindow',
						},
						{
							id: 'floats',
							title: 'floats',
							content: <ItemAdder />,
							group: 'allowWindow',
						},
					],
					x: 60,
					y: 60,
					w: 320,
					h: 300,
				},
			],
		},
	}

	return (
		<DockLayout
			ref={dockLayoutRef}
			defaultLayout={defaultLayout}
			groups={groups}
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
