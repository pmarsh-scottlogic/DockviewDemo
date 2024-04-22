import { Filters, TodoItem } from '../types'
import './FilterPanel.scss'

function getUniqueEntries<T>(arr: T[]) {
	return [...new Set(arr)]
}

function FilterPanel({
	filters,
	setFilters,
	todoItems,
}: {
	filters: Filters
	setFilters: React.Dispatch<React.SetStateAction<Filters>>
	todoItems: TodoItem[]
}) {
	const todoChecked = filters.showToDo
	const completeChecked = filters.showComplete

	const locationOptions = ['any'].concat(
		getUniqueEntries(todoItems.map((todoItem) => todoItem.location))
	)

	function handleChangeToDoCheckbox() {
		const todoNowChecked = !todoChecked
		setFilters((filters) => ({
			...filters,
			showToDo: todoNowChecked,
		}))
	}

	function handleChangeCompleteCheckbox() {
		const completeNowChecked = !completeChecked
		setFilters((filters) => ({
			...filters,
			showComplete: completeNowChecked,
		}))
	}

	return (
		<div className="filterPanel">
			<div className="labels">
				<label>completedness</label>
				<label htmlFor="location">location</label>
			</div>
			<div className="inputs">
				<div className="completednessPanel">
					<label>
						to do
						<input
							type="checkbox"
							defaultChecked={todoChecked}
							onChange={handleChangeToDoCheckbox}
						/>
					</label>
					<label>
						complete
						<input
							type="checkbox"
							defaultChecked={completeChecked}
							onChange={handleChangeCompleteCheckbox}
						/>
					</label>
				</div>
				<select
					id="location"
					defaultValue={locationOptions[0]}
					onChange={(event) =>
						setFilters((filters) => ({
							...filters,
							location: event.target.value,
						}))
					}
				>
					{locationOptions.map((locationOption) => (
						<option key={locationOption} value={locationOption}>
							{locationOption}
						</option>
					))}
				</select>
			</div>
		</div>
	)
}

export default FilterPanel
