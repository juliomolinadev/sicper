import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { RadioButtonGroup } from "../ui/molecules/RadioButtonGroup";
import { TableTransferReport } from "../ui/organisms/TableTransferReport";
import { TransferReport } from "../ui/organisms/TransferReport";

export const ModuloInformesTransferencias = () => {
	const [reportTypeValues, handleReportTipeInputChange] = useForm();
	const { privilegios } = useSelector((state) => state.auth);
	const { accesoGlobal: global } = privilegios;

	const reportTypesGlobal = [
		{
			id: "salientes",
			label: "Transferencias salientes"
		},
		{
			id: "entrantes",
			label: "Transferencias recibidas"
		},
		{
			id: "global",
			label: "Reportes global de transferencias"
		}
		// {
		// 	id: "tabla",
		// 	label: "Tabla de transferencias"
		// }
	];
	const reportTypesModulo = [
		{
			id: "salientes",
			label: "Transferencias salientes"
		},
		{
			id: "entrantes",
			label: "Transferencias recibidas"
		}
	];

	const checkboxStyles = {
		group: "btn-group btn-group-toggle d-print-none",
		button: "btn btn-outline-primary"
	};

	return (
		<div>
			<div className="row m-0 ">
				<div className="col-sm-12 p-3 d-flex justify-content-center">
					<h2>Reportes de transferencias</h2>
				</div>
			</div>

			<div className="row justify-content-center mb-5">
				<RadioButtonGroup
					inputName={"reportType"}
					options={global ? reportTypesGlobal : reportTypesModulo}
					formValues={reportTypeValues}
					setFunction={handleReportTipeInputChange}
					styles={checkboxStyles}
				/>
			</div>

			{reportTypeValues.reportType === "salientes" && <TransferReport tipo={"salientes"} />}
			{reportTypeValues.reportType === "entrantes" && <TransferReport tipo={"entrantes"} />}
			{reportTypeValues.reportType === "global" && global && <TransferReport tipo={"global"} />}
			{reportTypeValues.reportType === "tabla" && global && <TableTransferReport tipo={"tabla"} />}
		</div>
	);
};
