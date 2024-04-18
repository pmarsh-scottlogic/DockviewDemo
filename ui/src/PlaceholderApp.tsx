import { useState } from 'react'
import './Placeholder.css'
import { TodoItem } from './Todolist/types'
import ListDisplayer from './Todolist/ListDisplayer/ListDisplayer'
import ItemAdder from './Todolist/ItemAdder/ItemAdder'
import PLACEHOLDER_TODO_ITEMS from './Todolist/placeholderItems'

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
