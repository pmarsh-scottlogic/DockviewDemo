import { TodoItem } from './types'
import './DisplayList.scss'

const Separator = () => <span className="separator">{'|'}</span>

function DisplayList({ todoItems }: { todoItems: TodoItem[] }) {
	return (
		<ul>
			{todoItems.map((todoItem, index) => (
				<li key={index}>
					<input type="checkbox" checked={todoItem.complete} />
					<p>
						<span className="title">{todoItem.title}</span>
						<Separator />
						<span>{todoItem.location}</span>
						<Separator />
						<span>{todoItem.dueDate.toDateString()}</span>
					</p>
				</li>
			))}
		</ul>
	)
}

export default DisplayList
