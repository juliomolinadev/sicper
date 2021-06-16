import React from "react";
import PropTypes from "prop-types";

export const ButtonGroup = ({ options, setFunction, groupStyles, buttonStyles }) => {
	const defineButtonStile = (isOn) => {
		return isOn ? buttonStyles.on : buttonStyles.off;
	};

	return (
		<div className={groupStyles}>
			{Object.entries(options).map((option) => {
				const handleSetFunction = () => {
					setFunction(option[0]);
				};
				return (
					<button
						className={defineButtonStile(option[1])}
						type="button"
						key={option[0]}
						onClick={handleSetFunction}
					>
						<span>{option[0]}</span>
					</button>
				);
			})}
		</div>
	);
};

ButtonGroup.propTypes = {
	options: PropTypes.object.isRequired,
	setFunction: PropTypes.func.isRequired,
	groupStyles: PropTypes.string,
	buttonStyles: PropTypes.object
};

// options example
// const options = {
// 	optionA: false,
// 	optionB: false,
// 	optionC: false
// };

// buttonStyles example
// const buttonClasses = {
// 	on: "btn btn-primary",
// 	off: "btn btn-outline-primary"
// };
