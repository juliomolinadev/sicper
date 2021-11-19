import React from "react";
import { useSelector } from "react-redux";
import { transferColumns } from "../tables/configTables";
import { CustomTable } from "../tables/CustomTable";
import { startSetTransferencia } from "../../actions/transferenciasScreen";

export const TransferTable = () => {
	const { transferencias } = useSelector((state) => state.transferenciasScreen);

	return (
		<CustomTable
			title={transferencias.length === 0 ? "No se encontraron transferencias" : "Transferencias"}
			columns={transferColumns}
			data={transferencias}
			setFunction={startSetTransferencia}
		></CustomTable>
	);
};
