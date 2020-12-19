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

export const usuariosColumns = [
	{ name: "id", selector: "id", omit: true },
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
];

export const productoresColumns = [
	{ name: "id", selector: "id", omit: true },
	{ name: "Paterno", selector: "apPaterno", width: "140px", sortable: true },
	{ name: "Materno", selector: "apMaterno", width: "140px", sortable: true },
	{ name: "Nombre", selector: "nombre", width: "200px", sortable: true },
	{ name: "RFC", selector: "rfc", sortable: true, width: "140px", center: true }
];

export const cultivosColumns = [
	{ name: "id", selector: "id", omit: true },
	{ name: "clave", selector: "clave", sortable: true, width: "60px", center: true },
	{ name: "nombre", selector: "nombre", sortable: true, center: true },
	{ name: "subciclo", selector: "subciclo", sortable: true, center: true }
];

export const permisosColumns = [
	{ name: "id", selector: "id", omit: true },
	{ name: "PERMISO", selector: "numeroPermiso", sortable: true, width: "110px" },
	{ name: "CUENTA", selector: "cuenta", sortable: true, width: "80px" },
	{ name: "USUARIO", selector: "usuario", sortable: true, width: "160px" },
	{ name: "PRODUCTOR", selector: "nombreProductor", width: "160px", sortable: true },
	{ name: "CULTIVO", selector: "nombreCultivo", width: "100px", sortable: true },
	{ name: "SUP(ha)", selector: "supAutorizada", width: "60px", sortable: true, center: true },
	{ name: "LOTE", selector: "lote", sortable: true, width: "60px", center: true },
	{ name: "LOCALIDAD", selector: "localidad", sortable: true, width: "120px" },
	{ name: "EMICION", selector: "fechaEmicion", sortable: true, width: "100px" },
	{ name: "VIGENCIA", selector: "vigencia", sortable: true, width: "100px" },
	{ name: "ESTADO", selector: "estadoPermiso", sortable: true, width: "100px" }
];

export const autorizadosColumns = [
	{ name: "id", selector: "id", omit: true },
	{ name: "CULTIVO", selector: "cultivo", sortable: true, width: "160px", center: true },
	{ name: "NORMAL", selector: "normal", sortable: true, center: true },
	{ name: "EXTRA", selector: "extra", sortable: true, center: true },
	{ name: "ASIGNADA", selector: "disponible", sortable: true, center: true }
];
