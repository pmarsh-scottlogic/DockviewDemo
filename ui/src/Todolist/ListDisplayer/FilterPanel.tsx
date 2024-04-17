import './FilterPanel.scss'

function FilterPanel() {
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
						<input type="checkbox" />
					</label>
					<label>
						complete
						<input type="checkbox" />
					</label>
				</div>
			</div>
		</div>
	)
}

export default FilterPanel
