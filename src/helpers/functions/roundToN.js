export const roundToN = (num, n) => {
	return +(Math.round(num + `e+${n}`) + `e-${n}`);
};
