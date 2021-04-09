import { db } from "../firebase/firebase-config";

export const loadLocaltiesGroup = async (localties) => {
	let localtiesGroup = [];
	const localtiesData = [];
	const dataPromises = [];

	const pushOnLocaltiesData = (localtiesForLoad) => {
		dataPromises.push(db.collection(`colonias`).where("nombre", "in", localtiesForLoad).get());
	};

	localties.forEach((location, i) => {
		localtiesGroup.push(location);
		if (localtiesGroup.length === 10) {
			pushOnLocaltiesData(localtiesGroup);
			localtiesGroup.splice(0, localtiesGroup.length);
			i = 0;
		}
	});

	if (localtiesGroup.length > 0) pushOnLocaltiesData(localtiesGroup);

	const promisesResults = await Promise.all(dataPromises);

	promisesResults.forEach((promise) => {
		promise.forEach((snapHijo) => {
			localtiesData.push({
				id: snapHijo.id,
				...snapHijo.data()
			});
		});
	});

	return localtiesData;
};
