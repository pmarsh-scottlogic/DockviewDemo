import { useState } from 'react'
import './ItemAdder.scss'
import { TodoItem } from '../types'
import { useAppDispatch } from '../reduxHooks'
import { addTodoItemToList } from '../todoSlice'

function ItemAdder() {
	const dispatch = useAppDispatch()

	const [title, setTitle] = useState<string>()
	const [location, setLocation] = useState<string>()
	const [date, setDate] = useState<Date>()

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const newItem: TodoItem = {
			title: title ?? '',
			location: location ?? '',
			dueDate: date ?? new Date(0),
			complete: false,
		}
		dispatch(addTodoItemToList(newItem))
	}

	return (
		<section className="itemAdder">
			<form onSubmit={handleSubmit}>
				<div className="labels">
					<label htmlFor="title">Title</label>
					<label htmlFor="location">Location</label>
					<label htmlFor="dueDate">Due date</label>
				</div>
				<div className="inputs">
					<input
						id="title"
						type="text"
						defaultValue={title}
						onChange={(event) => setTitle(event.target.value)}
					/>
					<input
						id="location"
						type="text"
						defaultValue={location}
						onChange={(event) => setLocation(event.target.value)}
					/>
					<input
						type="datetime-local"
						id="dueDate"
						defaultValue={date?.valueOf()}
						onChange={(event) =>
							setDate(new Date(Date.parse(event.target.value)))
						}
					/>
				</div>
				<button type="submit">Add to list</button>
			</form>
		</section>
	)
}

export default ItemAdder
