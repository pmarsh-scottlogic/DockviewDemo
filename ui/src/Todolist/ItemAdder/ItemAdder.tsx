import './ItemAdder.scss'

function ItemAdder() {
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

			<button>Add to list</button>
		</div>
	)
}

export default ItemAdder
