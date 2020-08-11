import React from "react";
import Datatable from "react-data-table-component";
import styled from "styled-components";
import { padron } from "../../data/padron";

// TODO: Hacer los campos expandibles

const title = "Padron de usuarios";
const data = padron;
const columns = [
	{ name: "CUENTA", selector: "CUENTA", sortable: true, width: "80px" },
	{ name: "SUBCTA", selector: "SUBCTA", sortable: true, width: "60px", center: true },
	{ name: "UNIDAD", selector: "UNIDAD", sortable: true, width: "60px", center: true },
	{ name: "ZONA", selector: "ZONA", sortable: true, width: "60px", center: true },
	{ name: "SECCION", selector: "SECCION", sortable: true, width: "60px", center: true },
	{ name: "CP", selector: "CP", sortable: true, width: "60px", center: true },
	{ name: "LT", selector: "LT", sortable: true, width: "60px", center: true },
	{ name: "SLT", selector: "SLT", sortable: true, width: "60px", center: true },
	{ name: "RA", selector: "RA", sortable: true, width: "60px", center: true },
	{ name: "SRA", selector: "SRA", sortable: true, width: "60px", center: true },
	{ name: "SSRA", selector: "SSRA", sortable: true, width: "60px", center: true },
	{ name: "PCONTROL", selector: "PCONTROL", sortable: true, width: "80px", center: true },
	{ name: "TENENCIA", selector: "TENENCIA", sortable: true, width: "60px", center: true },
	{ name: "ESTADO", selector: "ESTADO", sortable: true, width: "60px", center: true },
	{ name: "MUNICIPIO", selector: "MUNICIPIO", sortable: true, width: "60px", center: true },
	{ name: "EJIDO", selector: "EJIDO", sortable: true, width: "60px", center: true },
	{ name: "GRUPO", selector: "GRUPO", sortable: true, width: "60px", center: true },
	{ name: "PREDIO", selector: "PREDIO", sortable: true, width: "60px", center: true },
	{ name: "SISTRIEGO", selector: "SISTRIEGO", sortable: true, width: "60px", center: true },
	{ name: "EQUIPO", selector: "EQUIPO", sortable: true, width: "60px", center: true },
	{ name: "APPATERNO", selector: "APPATERNO", sortable: true },
	{ name: "APMATERNO", selector: "APMATERNO", sortable: true },
	{ name: "NOMBRE", selector: "NOMBRE", sortable: true },
	{ name: "SUPFISICA", selector: "SUPFISICA", sortable: true, width: "80px", center: true },
	{ name: "SUPRIEGO", selector: "SUPRIEGO", sortable: true, width: "60px", center: true },
	{ name: "FECHA", selector: "FECHA", sortable: true },
	{ name: "REFERENCIA", selector: "REFERENCIA", sortable: true, width: "80px", center: true },
	{ name: "MODULO", selector: "MODULO", sortable: true, width: "60px", center: true }
];

const TextField = styled.input`
	height: 32px;
	width: 200px;
	border-radius: 3px;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	border: 1px solid #e5e5e5;
	padding: 0 32px 0 16px;

	&:hover {
		cursor: pointer;
	}
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
	<>
		<TextField
			id="search"
			type="text"
			placeholder="Filtrar por apellido"
			value={filterText}
			onChange={onFilter}
		/>
		<button className=" btn btn-primary btn-sm" type="button" onClick={onClear}>
			<i className="fas fa-redo"></i>
		</button>
	</>
);

function convertArrayOfObjectsToCSV(array) {
	let result;

	const columnDelimiter = ",";
	const lineDelimiter = "\n";
	const keys = Object.keys(data[0]);

	result = "";
	result += keys.join(columnDelimiter);
	result += lineDelimiter;

	array.forEach((item) => {
		let ctr = 0;
		keys.forEach((key) => {
			if (ctr > 0) result += columnDelimiter;

			result += item[key];

			ctr++;
		});
		result += lineDelimiter;
	});

	return result;
}

// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
function downloadCSV(array) {
	const link = document.createElement("a");
	let csv = convertArrayOfObjectsToCSV(array);
	if (csv == null) return;

	const filename = "Padron.csv";

	if (!csv.match(/^data:text\/csv/i)) {
		csv = `data:text/csv;charset=utf-8,${csv}`;
	}

	link.setAttribute("href", encodeURI(csv));
	link.setAttribute("download", filename);
	link.click();
}

const Export = ({ onExport }) => (
	<>
		<button
			className=" btn btn-primary btn-sm"
			type="button"
			onClick={(e) => onExport(e.target.value)}
		>
			<span>Descargar </span>
			<i className="fas fa-download"></i>
		</button>
	</>
);

export const PadronTable = () => {
	const [filterText, setFilterText] = React.useState("");
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
	const filteredItems = data.filter(
		(item) =>
			item["APPATERNO"] && item["APPATERNO"].toLowerCase().includes(filterText.toLowerCase())
	);

	// TODO: Hacer que los datos se descarguen en el orden en que se muestran al filtrarlos
	const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(filteredItems)} />, [
		filteredItems,
		filterText,
		resetPaginationToggle
	]);

	const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText("");
			}
		};

		return (
			<FilterComponent
				onFilter={(e) => setFilterText(e.target.value)}
				onClear={handleClear}
				filterText={filterText}
			/>
		);
	}, [filterText, resetPaginationToggle]);

	const paginationOptions = {
		rowsPerPageText: "Filas por pagina",
		rangesSeparatorText: "de",
		selectAllRowsItem: true,
		selectAllRowsItemText: "Todos"
	};
	return (
		<div className="table-responsive">
			<Datatable
				columns={columns}
				data={filteredItems}
				title={title}
				pagination
				paginationComponentOptions={paginationOptions}
				paginationResetDefaultPage={resetPaginationToggle}
				subHeaderComponent={subHeaderComponentMemo}
				fixedHeader
				subHeader
				persistTableHead
				fixedHeaderScrollHeight="600px"
				highlightOnHover={true}
				striped={true}
				pointerOnHover={true}
				dense={true}
				actions={actionsMemo}
			/>
		</div>
	);
};
