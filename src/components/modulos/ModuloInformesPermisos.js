import React from "react";
import { useForm } from "../../hooks/useForm";
import { GraficoPrincipalesCultivos } from "../charts/GraficoPrincipalesCultivos";
import { FormPermisosInformes } from "../forms/FormPermisosInformes";
import { PermisosTable } from "../tables/PermisosTable";
import { RadioButtonGroup } from "../ui/molecules/RadioButtonGroup";
import { CustomPermitsReport } from "../ui/organisms/CustomPermitsReport";
import { PermitsReport } from "../ui/organisms/PermitsReport";

export const ModuloInformesPermisos = () => {
	const [reportTypeValues, handleReportTipeInputChange] = useForm();

	const reportTypes = [
		{
			id: "grafico",
			label: "Reporte con grafico"
		},
		{
			id: "seccion",
			label: "Reporte por seccion"
		},
		{
			id: "configurable",
			label: "Reporte configurable"
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
					<h2>Reporte de permisos</h2>
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

			{reportTypeValues.reportType === "grafico" && (
				<>
					<div className="row d-flex justify-content-center">
						<div className="col-sm-9 no-printme">
							<FormPermisosInformes />
						</div>
					</div>

					<div className="row d-flex justify-content-center">
						<div className="col-sm-5 no-printme">
							<GraficoPrincipalesCultivos />
						</div>
					</div>

					<div className="row d-flex justify-content-center">
						<div className="col-lg-9">
							<PermisosTable />
						</div>
					</div>
				</>
			)}

			{reportTypeValues.reportType === "seccion" && <PermitsReport />}

			{reportTypeValues.reportType === "configurable" && <CustomPermitsReport />}
		</div>
	);
};
