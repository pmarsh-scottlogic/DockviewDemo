import { TodoItem } from './types'

function DisplayList({ todoItems }: { todoItems: TodoItem[] }) {
	return (
		<ul>
			{todoItems.map((todoItem, index) => (
				<li key={index}>{todoItem.title}</li>
			))}
		</ul>
	)
}

export default DisplayList
