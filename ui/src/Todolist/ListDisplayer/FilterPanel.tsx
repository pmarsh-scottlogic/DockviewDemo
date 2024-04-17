import { Completedness, Filters } from '../types'
import './FilterPanel.scss'

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
		const completedness: Completedness =
			toDoNowChecked && completeChecked
				? 'complete or to do'
				: toDoNowChecked && !completeChecked
				? 'to do'
				: !toDoNowChecked && completeChecked
				? 'complete'
				: 'neither'
		setFilters((filters) => ({ ...filters, completedness }))
	}

	function handleChangeCompleteCheckbox() {
		const completeNowChecked = !completeChecked
		const completedness: Completedness =
			toDoChecked && completeNowChecked
				? 'complete or to do'
				: toDoChecked && !completeNowChecked
				? 'to do'
				: !toDoChecked && completeNowChecked
				? 'complete'
				: 'neither'
		setFilters((filters) => ({ ...filters, completedness }))
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
