import React from "react";
import PropTypes from "prop-types";

export const CheckboxButtonGroup = ({ options, formValues, setFunction, styles }) => {
	const isActive = (currentValue) => formValues[currentValue] && "active";

	return (
		<div className={styles.group}>
			{options.map((option) => {
				return (
					<label key={option} className={`${styles.button} ${isActive(option)}`}>
						<input
							type="checkbox"
							name={option}
							id={option}
							value={option}
							onChange={setFunction}
						/>
						{option}
					</label>
				);
			})}
		</div>
	);
};

CheckboxButtonGroup.propTypes = {
	options: PropTypes.array.isRequired,
	formValues: PropTypes.object.isRequired,
	setFunction: PropTypes.func.isRequired,
	styles: PropTypes.object
};

// options example
// const options = ["op1", "op2", "op3", "op4"];

// styles example
// const styles = {
// 	group: "btn-group btn-group-toggle",
// 	button: "btn btn-primary"
// }
