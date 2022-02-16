import React from "react";
import { useForm } from "../../hooks/useForm";
import { RadioButtonGroup } from "../ui/molecules/RadioButtonGroup";
import { LaboresReport } from "../ui/organisms/LaboresReport";

export const ModuloInformesCesvbc = () => {
	const [reportTypeValues, handleReportTipeInputChange] = useForm();

	const reportTypes = [
		{
			id: "labores",
			label: "Reporte De Labores"
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
					<h2>Reportes (CESVBC)</h2>
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

			{reportTypeValues.reportType === "labores" && <LaboresReport tipo={"salientes"} />}
		</div>
	);
};
