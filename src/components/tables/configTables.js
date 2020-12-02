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
	{ name: "PERMISO", selector: "numeroPermiso", sortable: true, width: "80px" },
	{ name: "CUENTA", selector: "cuenta", sortable: true, width: "80px" },
	{ name: "USUARIO", selector: "usuario", sortable: true, width: "40px", center: true },
	{ name: "PRODUCTOR", selector: "nombreProductor", width: "140px", sortable: true },
	{ name: "CULTIVO", selector: "nombreCultivo", width: "140px", sortable: true },
	{ name: "DERECHO(ha)", selector: "supAutorizada", width: "200px", sortable: true },
	{ name: "LOTE", selector: "lote", sortable: true, width: "80px", center: true },
	{ name: "LOCALIDAD", selector: "localidad", sortable: true, width: "60px", center: true },
	{ name: "VIGENCIA", selector: "vigencia", sortable: true, width: "60px", center: true },
	{ name: "ESTADO", selector: "estadoPermiso", sortable: true, width: "60px", center: true }
];
