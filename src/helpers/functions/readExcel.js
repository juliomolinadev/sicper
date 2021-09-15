import { read, utils } from "xlsx";

export const readExcel = async (file) => {
	const promise = new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.readAsArrayBuffer(file);

		fileReader.onload = (e) => {
			const bufferArray = e.target.result;

			const workBook = read(bufferArray, { type: "buffer" });
			const workSheetName = workBook.SheetNames[0];
			const workSheet = workBook.Sheets[workSheetName];

			const data = utils.sheet_to_json(workSheet);

			resolve(data);
		};

		fileReader.onerror = (error) => {
			reject(error);
		};
	});

	return promise;
};
