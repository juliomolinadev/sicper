import React from "react";
import Datatable from "react-data-table-component";

export const CustomTable = ({ title, data, columns }) => {
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
				data={data}
				title={title}
				pagination
				paginationComponentOptions={paginationOptions}
				// paginationResetDefaultPage={resetPaginationToggle}
				// subHeaderComponent={subHeaderComponentMemo}
				fixedHeader
				subHeader
				persistTableHead
				fixedHeaderScrollHeight="600px"
				highlightOnHover={true}
				striped={true}
				pointerOnHover={true}
				dense={true}
				// actions={actionsMemo}
			/>
		</div>
	);
};
