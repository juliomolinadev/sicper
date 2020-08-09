import React from "react";
import { padron } from "../../data/padron";
import { Table } from "../ui/Table";

const title = "Padron de usuarios";
const data = padron;
const columns = [
	{ name: "CUENTA", selector: "CUENTA", sortable: true, width: "80px" },
	{ name: "SUBCTA", selector: "SUBCTA", sortable: true, width: "60px", center: true },
	{ name: "UNIDAD", selector: "UNIDAD", sortable: true, width: "60px", center: true },
	{ name: "ZONA", selector: "ZONA", sortable: true, width: "60px", center: true },
	{ name: "SECCION", selector: "SECCION", sortable: true, width: "60px", center: true },
	{ name: "CP", selector: "CP", sortable: true, width: "60px", center: true },
	{ name: "LT", selector: "LT", sortable: true, width: "60px", center: true },
	{ name: "SLT", selector: "SLT", sortable: true, width: "60px", center: true },
	{ name: "RA", selector: "RA", sortable: true, width: "60px", center: true },
	{ name: "SRA", selector: "SRA", sortable: true, width: "60px", center: true },
	{ name: "SSRA", selector: "SSRA", sortable: true, width: "60px", center: true },
	{ name: "PCONTROL", selector: "PCONTROL", sortable: true, width: "80px", center: true },
	{ name: "TENENCIA", selector: "TENENCIA", sortable: true, width: "60px", center: true },
	{ name: "ESTADO", selector: "ESTADO", sortable: true, width: "60px", center: true },
	{ name: "MUNICIPIO", selector: "MUNICIPIO", sortable: true, width: "60px", center: true },
	{ name: "EJIDO", selector: "EJIDO", sortable: true, width: "60px", center: true },
	{ name: "GRUPO", selector: "GRUPO", sortable: true, width: "60px", center: true },
	{ name: "PREDIO", selector: "PREDIO", sortable: true, width: "60px", center: true },
	{ name: "SISTRIEGO", selector: "SISTRIEGO", sortable: true, width: "60px", center: true },
	{ name: "EQUIPO", selector: "EQUIPO", sortable: true, width: "60px", center: true },
	{ name: "APPATERNO", selector: "APPATERNO", sortable: true },
	{ name: "APMATERNO", selector: "APMATERNO", sortable: true },
	{ name: "NOMBRE", selector: "NOMBRE", sortable: true },
	{ name: "SUPFISICA", selector: "SUPFISICA", sortable: true, width: "80px", center: true },
	{ name: "SUPRIEGO", selector: "SUPRIEGO", sortable: true, width: "60px", center: true },
	{ name: "FECHA", selector: "FECHA", sortable: true },
	{ name: "REFERENCIA", selector: "REFERENCIA", sortable: true, width: "80px", center: true },
	{ name: "MODULO", selector: "MODULO", sortable: true, width: "60px", center: true }
];

export const PadronScreen = () => {
	return (
		<>
			<div className="row m-3 d-flex justify-content-center">
				<h1>Padron de usuarios</h1>
			</div>
			<div className="row m-3">
				<div className="col-sm-8 border rounded">
					<Table columns={columns} data={data} title={title} />
				</div>
			</div>
		</>
	);
};
