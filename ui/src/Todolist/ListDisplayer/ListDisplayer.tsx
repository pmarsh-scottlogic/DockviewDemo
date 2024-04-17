import { TodoItem } from '../types'
import './ListDisplayer.scss'

const Separator = () => <span className="separator">{'|'}</span>

function ListDisplayer({
	todoItems,
	toggleTodoItemCompleteness,
}: {
	todoItems: TodoItem[]
	toggleTodoItemCompleteness: (title: string) => void
}) {
	return (
		<section className="listDisplayer">
			<ul>
				{todoItems.map((todoItem, index) => (
					<li key={index}>
						<label>
							<input
								type="checkbox"
								defaultChecked={todoItem.complete}
								onClick={() =>
									toggleTodoItemCompleteness(todoItem.title)
								}
							/>
							<span className="title">{todoItem.title}</span>
							<Separator />
							<span className="location">
								{todoItem.location}
							</span>
							<Separator />
							<span className="date">
								{todoItem.dueDate.toDateString()}
							</span>
						</label>
					</li>
				))}
			</ul>
		</section>
	)
}

export default ListDisplayer
