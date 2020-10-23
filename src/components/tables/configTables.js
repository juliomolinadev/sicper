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

export const padronColumns = [
	{ name: "cuenta", selector: "cuenta", sortable: true, width: "80px" },
	{ name: "subcta", selector: "subcta", sortable: true, width: "60px", center: true },
	{ name: "unidad", selector: "unidad", sortable: true, width: "60px", center: true },
	{ name: "zona", selector: "zona", sortable: true, width: "60px", center: true },
	{ name: "seccion", selector: "seccion", sortable: true, width: "60px", center: true },
	{ name: "cp", selector: "cp", sortable: true, width: "60px", center: true },
	{ name: "lt", selector: "lt", sortable: true, width: "60px", center: true },
	{ name: "slt", selector: "slt", sortable: true, width: "60px", center: true },
	{ name: "ra", selector: "ra", sortable: true, width: "60px", center: true },
	{ name: "sra", selector: "sra", sortable: true, width: "60px", center: true },
	{ name: "ssra", selector: "ssra", sortable: true, width: "60px", center: true },
	{ name: "pcontrol", selector: "pcontrol", sortable: true, width: "80px", center: true },
	{ name: "tenencia", selector: "tenencia", sortable: true, width: "60px", center: true },
	{ name: "estado", selector: "estado", sortable: true, width: "60px", center: true },
	{ name: "municipio", selector: "municipio", sortable: true, width: "60px", center: true },
	{ name: "ejido", selector: "ejido", sortable: true, width: "60px", center: true },
	{ name: "grupo", selector: "grupo", sortable: true, width: "60px", center: true },
	{ name: "predio", selector: "predio", sortable: true, width: "60px", center: true },
	{ name: "sistriego", selector: "sistriego", sortable: true, width: "60px", center: true },
	{ name: "equipo", selector: "equipo", sortable: true, width: "60px", center: true },
	{ name: "appaterno", selector: "appaterno", sortable: true },
	{ name: "apmaterno", selector: "apmaterno", sortable: true },
	{ name: "nombre", selector: "nombre", sortable: true },
	{ name: "supfisica", selector: "supfisica", sortable: true, width: "80px", center: true },
	{ name: "supriego", selector: "supriego", sortable: true, width: "60px", center: true },
	{ name: "fecha", selector: "fecha", sortable: true },
	{ name: "referencia", selector: "referencia", sortable: true, width: "80px", center: true },
	{ name: "modulo", selector: "modulo", sortable: true, width: "60px", center: true }
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
