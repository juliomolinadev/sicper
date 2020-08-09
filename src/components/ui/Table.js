import React from "react";
import Datatable from "react-data-table-component";
import styled from "styled-components";
// import Button from "../shared/Button";
// import { AddNewFab } from "./AddNewFab";

const btn = "X";

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

const ClearButton = styled(btn)`
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	height: 34px;
	width: 32px;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
	<>
		<TextField
			id="search"
			type="text"
			placeholder="Filtrar por nombre"
			value={filterText}
			onChange={onFilter}
		/>
		<ClearButton className=" btn btn-primary fab" type="button" onClick={onClear}>
			<i className="fas fa-redo"></i>
		</ClearButton>
	</>
);

export const Table = (props) => {
	const { data, columns, title } = props;

	const [filterText, setFilterText] = React.useState("");
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
	const filteredItems = data.filter(
		(item) => item["NOMBRE"] && item["NOMBRE"].toLowerCase().includes(filterText.toLowerCase())
	);

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
			/>
		</div>
	);
};
