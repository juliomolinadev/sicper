// import React from "react";
// import Datatable from "react-data-table-component";
// import { useDispatch, useSelector } from "react-redux";
// import styled from "styled-components";
// import { startLoadingDerechos } from "../../actions/derechos";
// import { useForm } from "../../hooks/useForm";

// // TODO: Hacer los campos expandibles

// const title = "Padron de usuarios";
// // const data = derechos;
// const columns = [
// 	{ name: "cuenta", selector: "cuenta", sortable: true, width: "80px" },
// 	{ name: "subcta", selector: "subcta", sortable: true, width: "60px", center: true },
// 	{ name: "unidad", selector: "unidad", sortable: true, width: "60px", center: true },
// 	{ name: "zona", selector: "zona", sortable: true, width: "60px", center: true },
// 	{ name: "seccion", selector: "seccion", sortable: true, width: "60px", center: true },
// 	{ name: "cp", selector: "cp", sortable: true, width: "60px", center: true },
// 	{ name: "lt", selector: "lt", sortable: true, width: "60px", center: true },
// 	{ name: "slt", selector: "slt", sortable: true, width: "60px", center: true },
// 	{ name: "ra", selector: "ra", sortable: true, width: "60px", center: true },
// 	{ name: "sra", selector: "sra", sortable: true, width: "60px", center: true },
// 	{ name: "ssra", selector: "ssra", sortable: true, width: "60px", center: true },
// 	{ name: "pcontrol", selector: "pcontrol", sortable: true, width: "80px", center: true },
// 	{ name: "tenencia", selector: "tenencia", sortable: true, width: "60px", center: true },
// 	{ name: "estado", selector: "estado", sortable: true, width: "60px", center: true },
// 	{ name: "municipio", selector: "municipio", sortable: true, width: "60px", center: true },
// 	{ name: "ejido", selector: "ejido", sortable: true, width: "60px", center: true },
// 	{ name: "grupo", selector: "grupo", sortable: true, width: "60px", center: true },
// 	{ name: "predio", selector: "predio", sortable: true, width: "60px", center: true },
// 	{ name: "sistriego", selector: "sistriego", sortable: true, width: "60px", center: true },
// 	{ name: "equipo", selector: "equipo", sortable: true, width: "60px", center: true },
// 	{ name: "appaterno", selector: "appaterno", sortable: true },
// 	{ name: "apmaterno", selector: "apmaterno", sortable: true },
// 	{ name: "nombre", selector: "nombre", sortable: true },
// 	{ name: "supfisica", selector: "supfisica", sortable: true, width: "80px", center: true },
// 	{ name: "supriego", selector: "supriego", sortable: true, width: "60px", center: true },
// 	{ name: "fecha", selector: "fecha", sortable: true },
// 	{ name: "referencia", selector: "referencia", sortable: true, width: "80px", center: true },
// 	{ name: "modulo", selector: "modulo", sortable: true, width: "60px", center: true }
// ];

// const TextField = styled.input`
// 	height: 32px;
// 	width: 200px;
// 	border-radius: 3px;
// 	border-top-left-radius: 5px;
// 	border-bottom-left-radius: 5px;
// 	border-top-right-radius: 0;
// 	border-bottom-right-radius: 0;
// 	border: 1px solid #e5e5e5;
// 	padding: 0 32px 0 16px;

// 	&:hover {
// 		cursor: pointer;
// 	}
// `;

// const FilterComponent = ({ filterText, onFilter, onClear }) => (
// 	<>
// 		<TextField
// 			id="search"
// 			type="text"
// 			placeholder="Filtrar por apellido"
// 			value={filterText}
// 			onChange={onFilter}
// 		/>
// 		<button className=" btn btn-primary btn-sm" type="button" onClick={onClear}>
// 			<i className="fas fa-redo"></i>
// 		</button>
// 	</>
// );

// function convertArrayOfObjectsToCSV(array) {
// 	let result;

// 	const columnDelimiter = ",";
// 	const lineDelimiter = "\n";
// 	const keys = [
// 		"cuenta",
// 		"subcta",
// 		"unidad",
// 		"zona",
// 		"seccion",
// 		"cp",
// 		"lt",
// 		"slt",
// 		"ra",
// 		"sra",
// 		"ssra",
// 		"pcontrol",
// 		"tenencia",
// 		"estado",
// 		"municipio",
// 		"ejido",
// 		"grupo",
// 		"predio",
// 		"sistriego",
// 		"equipo",
// 		"appaterno",
// 		"apmaterno",
// 		"nombre",
// 		"supfisica",
// 		"supriego",
// 		"fecha",
// 		"referencia",
// 		"modulo"
// 	];

// 	result = "";
// 	result += keys.join(columnDelimiter);
// 	result += lineDelimiter;

// 	array.forEach((item) => {
// 		let ctr = 0;
// 		keys.forEach((key) => {
// 			if (ctr > 0) result += columnDelimiter;

// 			result += item[key];

// 			ctr++;
// 		});
// 		result += lineDelimiter;
// 	});

// 	return result;
// }

// // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
// function downloadCSV(array) {
// 	const link = document.createElement("a");
// 	let csv = convertArrayOfObjectsToCSV(array);
// 	if (csv == null) return;

// 	const filename = "Padron.csv";

// 	if (!csv.match(/^data:text\/csv/i)) {
// 		csv = `data:text/csv;charset=utf-8,${csv}`;
// 	}

// 	link.setAttribute("href", encodeURI(csv));
// 	link.setAttribute("download", filename);
// 	link.click();
// }

// const Export = ({ onExport }) => (
// 	<>
// 		<button
// 			className=" btn btn-primary btn-sm"
// 			type="button"
// 			onClick={(e) => onExport(e.target.value)}
// 		>
// 			<span>Descargar </span>
// 			<i className="fas fa-download"></i>
// 		</button>
// 	</>
// );

// export const PadronTable = () => {
// 	const dispatch = useDispatch();

// 	const [formValues, handleInputChange] = useForm({
// 		apPaterno: ""
// 	});

// 	const { apPaterno } = formValues;

// 	let data = [];

// 	const derechos = useSelector((state) => state.padron);
// 	const handleDerechosLoad = async (e) => {
// 		e.preventDefault();
// 		console.log(apPaterno);
// 		dispatch(startLoadingDerechos(apPaterno));
// 		data = await Object.values(derechos);
// 	};

// 	console.log(derechos);

// 	// const data = Object.values(derechos);

// 	// derechos.forEach((derecho) => {
// 	// 	data.push(derecho);
// 	// });

// 	console.log("Deta:", data);

// 	const [filterText, setFilterText] = React.useState("");
// 	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
// 	const filteredItems = data.filter(
// 		(item) =>
// 			item["apPaterno"] && item["apPaterno"].toLowerCase().includes(filterText.toLowerCase())
// 	);

// 	// TODO: Hacer que los datos se descarguen en el orden en que se muestran al filtrarlos
// 	const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(filteredItems)} />, [
// 		filteredItems
// 	]);

// 	const subHeaderComponentMemo = React.useMemo(() => {
// 		const handleClear = () => {
// 			if (filterText) {
// 				setResetPaginationToggle(!resetPaginationToggle);
// 				setFilterText("");
// 			}
// 		};

// 		return (
// 			<FilterComponent
// 				onFilter={(e) => setFilterText(e.target.value)}
// 				onClear={handleClear}
// 				filterText={filterText}
// 			/>
// 		);
// 	}, [filterText, resetPaginationToggle]);

// 	const paginationOptions = {
// 		rowsPerPageText: "Filas por pagina",
// 		rangesSeparatorText: "de",
// 		selectAllRowsItem: true,
// 		selectAllRowsItemText: "Todos"
// 	};

// 	return (
// 		<div className="table-responsive">
// 			<>
// 				<TextField
// 					name="apPaterno"
// 					type="text"
// 					placeholder="Buscar por apellido"
// 					value={apPaterno}
// 					onChange={handleInputChange}
// 				/>
// 				<button className=" btn btn-primary btn-sm" type="submit" onClick={handleDerechosLoad}>
// 					<i className="fas fa-search"></i>
// 				</button>
// 			</>
// 			<Datatable
// 				columns={columns}
// 				data={filteredItems}
// 				title={title}
// 				pagination
// 				paginationComponentOptions={paginationOptions}
// 				paginationResetDefaultPage={resetPaginationToggle}
// 				subHeaderComponent={subHeaderComponentMemo}
// 				fixedHeader
// 				subHeader
// 				persistTableHead
// 				fixedHeaderScrollHeight="600px"
// 				highlightOnHover={true}
// 				striped={true}
// 				pointerOnHover={true}
// 				dense={true}
// 				actions={actionsMemo}
// 			/>
// 		</div>
// 	);
// };

// // Ctrl + Shift + W R   : Emmet wrap.
// // Alt + ↑ / ↓          : Mueve el contenido de una linea o seleccion.
// // Shift + Tab          : Quita la indentacion de un bloque seleccionado.
// // Alt + Shift + ↑ / ↓  : Clona la linea actual o bloque seleccionado abajo o arriba.
// // Ctrl + Shift + L     : Selecciona todas las ocurrencias de la seleccion.
// // Ctrl + Shift + K     : Borra la linea actual.
// // Ctrl + Shift + ↑ / ↓ : Crea multicursores continuos.
// // Ctrl + Alt + U       : Combierte seleccion en mayusculas.
// // Ctrl + D             : Selecciona la siguiente ocurencia con multicursor.

// // Ctrl + P             : [Input] Lista de busqueda para los archivos del proyecto
// // Ctrl + Shift + P     : [Input + >] Lista de busqueda para comandos.
// // Ctrl + Shift + O     : [Input + @] Lista de busqueda para las definiciones de elementos (: ordena).
// // Ctrl + G             : [Input + :] Buscar una linea en especifico.

// // Ctrl + Alt + clk der : Abre tab con la definicion del elemento en cursor, lo crea si no existe.
// // Ctrl + Shift + F12   : Abre una ventana que muestra la definicion del elemento en cursor.
// // F2                   : Refactorizar, rename.

// // Ctrl + K Z           : Modo zen.
// // Ctrl + `             : Abre la terminal.
// // Ctrl + K Ctrl + S    : Configuracion de shortcuts.
// // Ctrl + Shift + V     : Abre archivo en markdown para previsualizar.
// // Shift + Alt + S      : Guarda todos los archivos.
// // Ctrl + space         : Recupera el autocompletado.

// // Ctrl + /             : Comenta la linea donde se encuentre el cursor o el bloque seleccionado.
// // Ctrl + Shift + A     : Comenta solo el fragmento seleccionado.
