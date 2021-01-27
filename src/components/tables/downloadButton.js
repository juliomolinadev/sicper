// // TODO: Hacer que los datos se descarguen en el orden en que se muestran al filtrarlos

// export const downloadButton = (data, keys, fileName) => {
// 	const actionsMsemo = React.useMemo(() => <Export onExport={() => downloadCSV(data)} />, [data]);

// 	function convertArrayOfObjectsToCSV(array) {
// 		let result;

// 		const columnDelimiter = ",";
// 		const lineDelimiter = "\n";

// 		result = "";
// 		result += keys.join(columnDelimiter);
// 		result += lineDelimiter;

// 		array.forEach((item) => {
// 			let ctr = 0;
// 			keys.forEach((key) => {
// 				if (ctr > 0) result += columnDelimiter;
// 				result += item[key];
// 				ctr++;
// 			});
// 			result += lineDelimiter;
// 		});

// 		return result;
// 	}

// 	function downloadCSV(array) {
// 		const link = document.createElement("a");
// 		let csv = convertArrayOfObjectsToCSV(array);
// 		if (csv == null) return;

// 		if (!csv.match(/^data:text\/csv/i)) {
// 			csv = `data:text/csv;charset=utf-8,${csv}`;
// 		}

// 		link.setAttribute("href", encodeURI(csv));
// 		link.setAttribute("download", fileName);
// 		link.click();
// 	}

// 	const Export = ({ onExport }) => (
// 		<>
// 			<button
// 				className=" btn btn-primary btn-sm"
// 				type="button"
// 				onClick={(e) => onExport(e.target.value)}
// 			>
// 				<span>Descargar </span>
// 				<i className="fas fa-download"></i>
// 			</button>
// 		</>
// 	);

// 	return actionsMsemo;
// };
