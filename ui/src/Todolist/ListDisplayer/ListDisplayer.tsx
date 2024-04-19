import { useState } from 'react'
import { Filters, TodoItem, getTodoItemId } from '../types'
import './ListDisplayer.scss'
import FilterPanel from './FilterPanel'
import { useAppDispatch, useAppSelector } from '../reduxHooks'
import { toggleTodoItemCompleteness } from '../todoSlice'

const Separator = () => <span className="separator">{'|'}</span>

function todoItemShouldBeIncluded(todoItem: TodoItem, filters: Filters) {
	const completeItemsIncluded =
		filters.completedness === 'complete' ||
		filters.completedness === 'complete or to do'
	const todoItemsIncluded =
		filters.completedness === 'to do' ||
		filters.completedness === 'complete or to do'

	const correctCompletedness =
		(completeItemsIncluded && todoItem.complete) ||
		(todoItemsIncluded && !todoItem.complete)
	const correctLocation =
		filters.location === 'any' || filters.location === todoItem.location

	return correctCompletedness && correctLocation
}

function ListDisplayer() {
	const todoItems = useAppSelector((state) => state.todo.todoItems)
	const dispatch = useAppDispatch()

	const [showFilters, setShowFilters] = useState(false)
	const [filters, setFilters] = useState<Filters>({
		completedness: 'complete or to do',
		location: 'any',
	})

	const filteredTodoItems = todoItems.filter((todoItem) =>
		todoItemShouldBeIncluded(todoItem, filters)
	)
	return (
		<section className="listDisplayer">
			<ul>
				{filteredTodoItems.map((todoItem) => (
					<li key={getTodoItemId(todoItem)}>
						<label>
							<input
								type="checkbox"
								defaultChecked={todoItem.complete}
								onClick={() =>
									dispatch(
										toggleTodoItemCompleteness(
											todoItem.title
										)
									)
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
			<div className="filterArea">
				<button
					onClick={() =>
						setShowFilters((showFilters) => !showFilters)
					}
				>
					{showFilters ? 'Hide filters' : 'Show filters'}
				</button>
				{showFilters && (
					<FilterPanel
						filters={filters}
						setFilters={setFilters}
						todoItems={todoItems}
					/>
				)}
			</div>
		</section>
	)
}

export default ListDisplayer
