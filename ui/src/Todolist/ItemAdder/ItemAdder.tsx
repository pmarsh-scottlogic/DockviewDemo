import './ItemAdder.scss'

function ItemAdder({
	addTodoItemToList,
}: {
	addTodoItemToList: (title: string, location: string, dueDate: Date) => void
}) {
	return (
		<div>
			<table>
				<tr>
					<label htmlFor="title">Title</label>
					<input id="title" type="text" />
				</tr>
				<tr>
					<label htmlFor="location">Location</label>
					<input id="location" type="text" />
				</tr>
				<tr>
					<label htmlFor="dueDate">Due date</label>
					<input type="datetime-local" id="dueDate" />
				</tr>
			</table>

			<button
				onClick={() =>
					addTodoItemToList('fake', 'location', new Date(Date.now()))
				}
			>
				Add to list
			</button>
		</div>
	)
}

export default ItemAdder
