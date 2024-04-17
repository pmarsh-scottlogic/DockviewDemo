import { useState } from 'react'
import './Placeholder.css'
import { TodoItem } from './Todolist/types'
import ListDisplayer from './Todolist/ListDisplayer/ListDisplayer'
import ItemAdder from './Todolist/ItemAdder/ItemAdder'

const PLACEHOLDER_TODO_ITEMS = [
	{
		title: 'Buy groceries',
		location: 'Tesco',
		complete: false,
		dueDate: new Date(Date.parse('01 Sep 2012 00:00:00 GMT')),
	},
	{
		title: 'Cook curry',
		location: 'Home',
		complete: false,
		dueDate: new Date(Date.parse('02 Sep 2012 00:00:00 GMT')),
	},
	{
		title: 'Recycle batteries',
		location: 'Tesco',
		complete: false,
		dueDate: new Date(Date.parse('01 Sep 2012 00:00:00 GMT')),
	},
	{
		title: 'Take bins out',
		location: 'Home',
		complete: false,
		dueDate: new Date(Date.parse('03 Sep 2012 00:00:00 GMT')),
	},
	{
		title: 'Take kids to school',
		location: 'School',
		complete: true,
		dueDate: new Date(Date.parse('01 Sep 2012 00:00:00 GMT')),
	},
] as TodoItem[]

function PlaceholderApp() {
	const [todoItems, setTodoItems] = useState<TodoItem[]>(
		PLACEHOLDER_TODO_ITEMS
	)

	function toggleTodoItemCompleteness(title: string) {
		setTodoItems((todoItems) =>
			todoItems.map((todoItem) =>
				todoItem.title === title
					? { ...todoItem, complete: !todoItem.complete }
					: todoItem
			)
		)
	}

	function addTodoItemToList(newItem: TodoItem) {
		setTodoItems((todoItems) => [...todoItems, newItem])
	}

	return (
		<>
			<ListDisplayer
				todoItems={todoItems}
				toggleTodoItemCompleteness={toggleTodoItemCompleteness}
			/>
			<ItemAdder addTodoItemToList={addTodoItemToList} />
		</>
	)
}

export default PlaceholderApp
