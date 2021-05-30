import React from "react";
import PropTypes from "prop-types";

export const RadioButtonGroup = ({ inputName, options, formValues, setFunction, styles }) => {
	const isActive = (currentValue) => currentValue === formValues[inputName] && "active";

	return (
		<div className={styles.group}>
			{options.map(({ id, label }) => {
				return (
					<label key={id} className={`${styles.button} ${isActive(id)}`}>
						<input type="radio" name={inputName} id={id} value={id} onChange={setFunction} />
						{label}
					</label>
				);
			})}
		</div>
	);
};

RadioButtonGroup.propTypes = {
	inputName: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	formValues: PropTypes.object.isRequired,
	setFunction: PropTypes.func.isRequired,
	styles: PropTypes.object
};

// options example
// const options = [
// 	{
// 		id: "id0",
// 		label: "Label 0"
// 	},
// 	{
// 		id: "id1",
// 		label: "Label 1"
// 	}
// ];

// styles example
// const styles = {
// 	group: "btn-group btn-group-toggle",
// 	button: "btn btn-primary"
// }
