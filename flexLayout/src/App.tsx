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
		],
	},
}

const model = Model.fromJson(json)

function App() {
	const factory = (node: TabNode) => {
		const component = node.getComponent()
		return component === 'todoDisplay' ? (
			<ListDisplayer />
		) : component === 'todoAdder' ? (
			<ItemAdder />
		) : (
			<p>{`DevError: the component ${component} was not defined in the factory`}</p>
		)
	}

	return <Layout model={model} factory={factory} />
}

export default App
