import { write, utils } from "xlsx";
import FileSaver from "file-saver";

const EXCEL_TYPE =
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

export const exportJSONToExcel = (data, title, author, sheetName) => {
	const workBook = utils.book_new();
	workBook.Props = {
		Title: title,
		Author: author,
		CreatedDate: new Date()
	};

	workBook.SheetNames.push(sheetName);

	const workSheet = utils.json_to_sheet(data);
	workBook.Sheets[sheetName] = workSheet;

	const excelBuffer = write(workBook, { bookType: "xlsx", type: "array" });

	saveAsExcel(excelBuffer, title);
};

const saveAsExcel = (buffer, fileName) => {
	const data = new Blob([buffer], { type: EXCEL_TYPE });
	FileSaver.saveAs(data, `${fileName}.xlsx`);
};
