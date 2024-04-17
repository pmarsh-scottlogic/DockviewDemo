import { Completedness, Filters, TodoItem } from '../types'
import './FilterPanel.scss'

function determineCompletedness(
	toDoChecked: boolean,
	completeChecked: boolean
): Completedness {
	return toDoChecked && completeChecked
		? 'complete or to do'
		: toDoChecked && !completeChecked
		? 'to do'
		: !toDoChecked && completeChecked
		? 'complete'
		: 'neither'
}

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
	const toDoChecked =
		filters.completedness === 'to do' ||
		filters.completedness === 'complete or to do'
	const completeChecked =
		filters.completedness === 'complete' ||
		filters.completedness === 'complete or to do'

	const locationOptions = ['any'].concat(
		getUniqueEntries(todoItems.map((todoItem) => todoItem.location))
	)

	function handleChangeToDoCheckbox() {
		const toDoNowChecked = !toDoChecked
		setFilters((filters) => ({
			...filters,
			completedness: determineCompletedness(
				toDoNowChecked,
				completeChecked
			),
		}))
	}

	function handleChangeCompleteCheckbox() {
		const completeNowChecked = !completeChecked
		setFilters((filters) => ({
			...filters,
			completedness: determineCompletedness(
				toDoChecked,
				completeNowChecked
			),
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
							defaultChecked={toDoChecked}
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
						<option value={locationOption}>{locationOption}</option>
					))}
				</select>
			</div>
		</div>
	)
}

export default FilterPanel
