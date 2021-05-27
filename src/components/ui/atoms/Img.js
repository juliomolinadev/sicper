import React from "react";
import PropTypes from "prop-types";

export const Img = ({ styles = "", src = "", alt = "", maxHeight = 100, action = () => {} }) => {
	return (
		<img className={styles} src={src} alt={alt} onClick={action} style={{ maxHeight: maxHeight }} />
	);
};

Img.propTypes = {
	styles: PropTypes.string,
	src: PropTypes.string.isRequired,
	alt: PropTypes.string,
	maxHeight: PropTypes.number,
	action: PropTypes.func
};
