import './ItemAdder.scss'

function ItemAdder({
	addTodoItemToList,
}: {
	addTodoItemToList: (title: string, location: string, dueDate: Date) => void
}) {
	return (
		<section className="itemAdder">
			<div className="form">
				<div className="labels">
					<label htmlFor="title">Title</label>
					<label htmlFor="location">Location</label>
					<label htmlFor="dueDate">Due date</label>
				</div>
				<div className="inputs">
					<input id="title" type="text" />
					<input id="location" type="text" />
					<input type="datetime-local" id="dueDate" />
				</div>
			</div>
			<button
				onClick={() =>
					addTodoItemToList('fake', 'location', new Date(Date.now()))
				}
			>
				Add to list
			</button>
		</section>
	)
}

export default ItemAdder
