import { Completedness, Filters } from '../types'
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

function FilterPanel({
	filters,
	setFilters,
}: {
	filters: Filters
	setFilters: React.Dispatch<React.SetStateAction<Filters>>
}) {
	const toDoChecked =
		filters.completedness === 'to do' ||
		filters.completedness === 'complete or to do'
	const completeChecked =
		filters.completedness === 'complete' ||
		filters.completedness === 'complete or to do'

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
				<label>location</label>
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
			</div>
		</div>
	)
}

export default FilterPanel
