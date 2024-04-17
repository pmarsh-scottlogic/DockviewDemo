import { useState } from 'react'
import { Filters } from '../types'
import './FilterPanel.scss'

function FilterPanel({
	filters,
	setFilters,
}: {
	filters: Filters
	setFilters: React.Dispatch<React.SetStateAction<Filters>>
}) {
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
						<input type="checkbox" defaultChecked={true} />
					</label>
					<label>
						complete
						<input type="checkbox" defaultChecked={true} />
					</label>
				</div>
			</div>
		</div>
	)
}

export default FilterPanel
