import React from "react";
import Datatable from "react-data-table-component";
import styled from "styled-components";
import { permisos } from "../../data/permisos";

// TODO: Hacer los campos expandibles

const title = "Permisos";
const data = permisos;
const columns = [
	{ name: "id", selector: "id", sortable: true },
	{ name: "numero", selector: "numero", sortable: true },
	{ name: "tipo", selector: "tipo", sortable: true },
	{ name: "ciclo", selector: "ciclo", sortable: true },
	{ name: "subCiclo", selector: "subCiclo", sortable: true },
	{ name: "cultivo", selector: "cultivo", sortable: true },
	{ name: "variedad", selector: "variedad", sortable: true },
	{ name: "vigencia", selector: "vigencia", sortable: true },
	{ name: "fechaLimite", selector: "fechaLimite", sortable: true },
	{ name: "superficie", selector: "superficie", sortable: true },
	{ name: "sistema", selector: "sistema", sortable: true },
	{ name: "estado", selector: "estado", sortable: true },
	{ name: "folioSanidad", selector: "folioSanidad", sortable: true },
	{ name: "Usuario", selector: "Usuario", sortable: true },
	{ name: "Productor", selector: "Productor", sortable: true },
	{ name: "fuenteCredito", selector: "fuenteCredito", sortable: true },
	{ name: "lote", selector: "lote", sortable: true },
	{ name: "ubicacion", selector: "ubicacion", sortable: true },
	{ name: "Cuota", selector: "Cuota", sortable: true }
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

	const filename = "Permisos.csv";

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

export const PermisosTable = () => {
	const [filterText, setFilterText] = React.useState("");
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
	const filteredItems = data.filter(
		(item) => item["numero"] && item["numero"].toLowerCase().includes(filterText.toLowerCase())
	);

	// TODO: Hacer que los datos se descarguen en el orden en que se muestran al filtrarlos
	const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(filteredItems)} />, [
		filteredItems
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
