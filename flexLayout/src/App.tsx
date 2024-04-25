import { Layout, Model, TabNode, IJsonModel } from 'flexlayout-react'
import './App.css'
import 'flexlayout-react/style/light.css'
import ListDisplayer from './Todolist/ListDisplayer/ListDisplayer'
import ItemAdder from './Todolist/ItemAdder/ItemAdder'

const json: IJsonModel = {
	global: { tabEnableFloat: true },
	borders: [],
	layout: {
		type: 'row',
		weight: 100,
		children: [
			{
				type: 'row',
				weight: 50,
				children: [
					{
						type: 'tabset',
						weight: 50,
						children: [
							{
								type: 'tab',
								name: 'yes',
								component: 'todoDisplay',
							},
						],
					},
					{
						type: 'tabset',
						weight: 50,
						children: [
							{
								type: 'tab',
								name: 'no',
								component: 'todoDisplay',
							},
						],
					},
				],
			},
			{
				type: 'tabset',
				weight: 50,
				children: [
					{
						type: 'tab',
						name: 'Two',
						component: 'todoAdder',
					},
				],
			},
			{
				type: 'tabset',
				weight: 50,
				children: [
					{
						type: 'tab',
						name: 'derek',
						component: 'float',
					},
				],
			},
		],
	},
}

function App() {
	let model = Model.fromJson(json)

	const factory = (node: TabNode) => {
		const component = node.getComponent()
		return component === 'todoDisplay' ? (
			<ListDisplayer />
		) : component === 'todoAdder' ? (
			<ItemAdder />
		) : component === 'float' ? (
			<div>
				<p>I'm a floater</p>
				<button
					onClick={() => {
						console.log(
							JSON.stringify(node.getModel().toJson(), null, 2)
						)
						const sameAsStart =
							JSON.stringify(json) ===
							JSON.stringify(node.getModel().toJson())
						console.log('same as start', sameAsStart)
					}}
				>
					show json
				</button>
				<button
					onClick={() => {
						const modelJson = JSON.stringify(
							node.getModel().toJson().layout,
							undefined,
							2
						)
						localStorage.setItem('savedLayout', modelJson)
					}}
				>
					save
				</button>
				<button
					onClick={() => {
						const modelJson = localStorage.getItem('savedLayout')
						console.log(
							'getting saved layout from localStorage',
							modelJson
						)
						if (modelJson) {
							const JsonObj: IJsonModel = JSON.parse(modelJson)
							model = Model.fromJson(JsonObj)
						}
					}}
				>
					load
				</button>
				<button>new window</button>
			</div>
		) : (
			<p>{`DevError: the component ${component} was not defined in the factory`}</p>
		)
	}

	return <Layout model={model} factory={factory} />
}

export default App
