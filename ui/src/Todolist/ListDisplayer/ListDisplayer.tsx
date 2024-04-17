import { useState } from 'react'
import { Filters, TodoItem } from '../types'
import './ListDisplayer.scss'
import FilterPanel from './FilterPanel'

const Separator = () => <span className="separator">{'|'}</span>

function ListDisplayer({
	todoItems,
	toggleTodoItemCompleteness,
}: {
	todoItems: TodoItem[]
	toggleTodoItemCompleteness: (title: string) => void
}) {
	const [showFilters, setShowFilters] = useState(false)
	const [filters, setFilters] = useState<Filters>({
		completedness: 'done or not done',
	})

	const filteredTodoItems = todoItems.filter((todoItem) =>
		filters.completedness === 'done'
			? todoItem.complete
			: filters.completedness === 'not done'
			? !todoItem.complete
			: true
	)
	return (
		<section className="listDisplayer">
			<button
				onClick={() => setShowFilters((showFilters) => !showFilters)}
			>
				{showFilters ? 'Hide filters' : 'Show filters'}
			</button>
			{/* {showFilters && <FilterPanel />} */}
			<FilterPanel filters={filters} setFilters={setFilters} />

			<ul>
				{filteredTodoItems.map((todoItem, index) => (
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
