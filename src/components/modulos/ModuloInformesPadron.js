import React from "react";
import { useForm } from "../../hooks/useForm";
import { RadioButtonGroup } from "../ui/molecules/RadioButtonGroup";
import { ProducersReport } from "../ui/organisms/ProducersReport";
import { UsersReport } from "../ui/organisms/UsersReport";

export const ModuloInformesPadron = () => {
	const [reportTypeValues, handleReportTipeInputChange] = useForm();

	const reportTypes = [
		{
			id: "usuarios",
			label: "Padron de usuarios"
		},
		{
			id: "supDisponible",
			label: "Superficie disponible"
		},
		{
			id: "productores",
			label: "Padron de productores"
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
					<h2>Reportes de padron</h2>
				</div>
			</div>

			<div className="row justify-content-center mb-5">
				<RadioButtonGroup
					inputName={"reportType"}
					options={reportTypes}
					formValues={reportTypeValues}
					setFunction={handleReportTipeInputChange}
					styles={checkboxStyles}
				/>
			</div>

			{reportTypeValues.reportType === "usuarios" && <UsersReport onlyAvailable={false} />}
			{reportTypeValues.reportType === "supDisponible" && <UsersReport onlyAvailable={true} />}

			{reportTypeValues.reportType === "productores" && <ProducersReport />}
		</div>
	);
};
