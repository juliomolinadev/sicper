import React from "react";
import { useSelector } from "react-redux";
import { transferColumns } from "../tables/configTables";
import { CustomTable } from "../tables/CustomTable";
import { setTransferencia } from "../../actions/transferenciasScreen";

export const TransferTable = () => {
	const { transferencias } = useSelector((state) => state.transferenciasScreen);

	return (
		<CustomTable
			title={transferencias.length === 0 ? "No se encontraron tramsferencias" : "Transferencias"}
			columns={transferColumns}
			data={transferencias}
			setFunction={setTransferencia}
		></CustomTable>
	);
};
