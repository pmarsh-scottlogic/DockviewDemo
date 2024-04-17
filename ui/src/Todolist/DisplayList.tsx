import { TodoItem } from './types'
import './DisplayList.scss'

const Separator = () => <span className="separator">{'|'}</span>

function DisplayList({
	todoItems,
	toggleTodoItemCompleteness,
}: {
	todoItems: TodoItem[]
	toggleTodoItemCompleteness: (title: string) => void
}) {
	return (
		<ul>
			{todoItems.map((todoItem, index) => (
				<li key={index}>
					<input
						type="checkbox"
						checked={todoItem.complete}
						onClick={() =>
							toggleTodoItemCompleteness(todoItem.title)
						}
					/>
					<p>
						<span className="title">{todoItem.title}</span>
						<Separator />
						<span className="location">{todoItem.location}</span>
						<Separator />
						<span className="date">
							{todoItem.dueDate.toDateString()}
						</span>
					</p>
				</li>
			))}
		</ul>
	)
}

export default DisplayList
