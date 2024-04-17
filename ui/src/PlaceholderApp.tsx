import { useState } from 'react'
import './Placeholder.css'
import { TodoItem } from './Todolist/types'

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
	return (
		<section>
			<h1>To do list</h1>
			<ul>
				{todoItems.map((todoItem, index) => (
					<li key={index}>{todoItem.title}</li>
				))}
			</ul>
		</section>
	)
}

export default PlaceholderApp
