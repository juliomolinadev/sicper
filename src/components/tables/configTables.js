import styled from "styled-components";

export const TextField = styled.input`
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

export const derechosColumns = [
	{ name: "Cuenta", selector: "cuenta", sortable: true, width: "80px" },
	{ name: "Subcta", selector: "subcta", sortable: true, width: "40px", center: true },
	{ name: "Paterno", selector: "apPaterno", width: "140px", sortable: true },
	{ name: "Materno", selector: "apMaterno", width: "140px", sortable: true },
	{ name: "Nombre", selector: "nombre", width: "200px", sortable: true },
	{ name: "Derecho(ha)", selector: "supRiego", sortable: true, width: "80px", center: true },
	{ name: "Lote", selector: "predio", sortable: true, width: "60px", center: true },
	{ name: "Ejido", selector: "ejido", sortable: true, width: "60px", center: true },
	{ name: "Seccion", selector: "seccion", sortable: true, width: "60px", center: true },
	{ name: "Modulo", selector: "modulo", sortable: true, width: "60px", center: true }
	// { name: "unidad", selector: "unidad", sortable: true, width: "60px", center: true },
	// { name: "zona", selector: "zona", sortable: true, width: "60px", center: true },
	// { name: "cp", selector: "cp", sortable: true, width: "60px", center: true },
	// { name: "lt", selector: "lt", sortable: true, width: "60px", center: true },
	// { name: "slt", selector: "slt", sortable: true, width: "60px", center: true },
	// { name: "ra", selector: "ra", sortable: true, width: "60px", center: true },
	// { name: "sra", selector: "sra", sortable: true, width: "60px", center: true },
	// { name: "ssra", selector: "ssra", sortable: true, width: "60px", center: true },
	// { name: "pControl", selector: "pControl", sortable: true, width: "80px", center: true },
	// { name: "tenencia", selector: "tenencia", sortable: true, width: "60px", center: true },
	// { name: "estado", selector: "estado", sortable: true, width: "60px", center: true },
	// { name: "municipio", selector: "municipio", sortable: true, width: "60px", center: true },
	// { name: "grupo", selector: "grupo", sortable: true, width: "60px", center: true },
	// { name: "sistRiego", selector: "sistRiego", sortable: true, width: "60px", center: true },
	// { name: "equipo", selector: "equipo", sortable: true, width: "60px", center: true },
	// { name: "supFisica", selector: "supFisica", sortable: true, width: "80px", center: true },
	// { name: "fecha", selector: "fecha", sortable: true },
	// { name: "referencia", selector: "referencia", sortable: true, width: "80px", center: true }
];

export const cultivosColumns = [
	{ name: "clave", selector: "clave", sortable: true, width: "60px", center: true },
	{ name: "nombre", selector: "nombre", sortable: true, center: true },
	{ name: "subciclo", selector: "subciclo", sortable: true, center: true }
];

export const padronKeys = [
	"cuenta",
	"subcta",
	"unidad",
	"zona",
	"seccion",
	"cp",
	"lt",
	"slt",
	"ra",
	"sra",
	"ssra",
	"pcontrol",
	"tenencia",
	"estado",
	"municipio",
	"ejido",
	"grupo",
	"predio",
	"sistriego",
	"equipo",
	"appaterno",
	"apmaterno",
	"nombre",
	"supfisica",
	"supriego",
	"fecha",
	"referencia",
	"modulo"
];
