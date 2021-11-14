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
	{ name: "CUENTA", selector: "cuenta", sortable: true, width: "80px" },
	{ name: "SUBCTA", selector: "subcta", sortable: true, width: "40px", center: true },
	{ name: "PATERNO", selector: "apPaterno", width: "120px", sortable: true },
	{ name: "MATERNO", selector: "apMaterno", width: "120px", sortable: true },
	{ name: "NOMBRE", selector: "nombre", width: "150px", sortable: true },
	{ name: "DERECHO(ha)", selector: "supRiego", sortable: true, width: "80px", center: true },
	{ name: "LOTE", selector: "predio", sortable: true, width: "60px", center: true },
	{ name: "EJ/COL", selector: "tipoLocalidad", sortable: true, width: "80px" },
	{ name: "LOCALIDAD", selector: "nombreLocalidad", sortable: true, width: "200px" },
	{ name: "SECCION", selector: "seccion", sortable: true, width: "60px", center: true },
	{ name: "MODULO", selector: "modulo", sortable: true, width: "60px", center: true }
];

export const transferColumns = [
	{ name: "id", selector: "id", omit: true },
	{ name: "FOLIO", selector: "folio", sortable: true, width: "100px", center: true },
	{ name: "ESTADO", selector: "estadoTransferencia", sortable: true, width: "120px", center: true },
	{ name: "MODULO", selector: "modulo", sortable: true, width: "60px", center: true },
	{
		name: "SUP(ha)",
		selector: "superficieTransferida",
		sortable: true,
		width: "80px",
		center: true
	},
	{ name: "CUENTA", selector: "cuenta", sortable: true, width: "80px" },
	{ name: "SUBCTA", selector: "subcta", sortable: true, width: "40px", center: true },
	{ name: "PATERNO", selector: "apPaterno", width: "120px", sortable: true },
	{ name: "MATERNO", selector: "apMaterno", width: "120px", sortable: true },
	{ name: "NOMBRE", selector: "nombre", width: "150px", sortable: true },
	{ name: "LOTE", selector: "predio", sortable: true, width: "60px", center: true },
	{ name: "EJ/COL", selector: "tipoLocalidad", sortable: true, width: "80px" },
	{ name: "LOCALIDAD", selector: "nombreLocalidad", sortable: true, width: "200px" }
];

export const productoresColumns = [
	{ name: "id", selector: "id", omit: true },
	{ name: "PATERNO", selector: "apPaterno", width: "140px", sortable: true },
	{ name: "MATERNO", selector: "apMaterno", width: "140px", sortable: true },
	{ name: "NOMBRE", selector: "nombre", width: "200px", sortable: true },
	{ name: "CURP", selector: "curp", sortable: true, width: "180px", center: true }
];

export const cultivosColumns = [
	{ name: "id", selector: "id", omit: true },
	{ name: "CLAVE", selector: "clave", sortable: true, width: "60px", center: true },
	{ name: "NOMBRE", selector: "nombre", sortable: true, center: true },
	{ name: "SUBCICLO", selector: "subciclo", sortable: true, center: true }
];

export const systemUsersColumns = [
	{ name: "id", selector: "id", omit: true },
	{ name: "CLAVE ENTIDAD", selector: "claveEntidad", sortable: true, center: true },
	{ name: "NOMBRE", selector: "displayName", sortable: true },
	{ name: "CORREO", selector: "email", sortable: true },
	{ name: "ROL", selector: "rol", sortable: true }
];

export const localtiesColumns = [
	{ name: "id", selector: "id", omit: true },
	{ name: "CLAVE", selector: "clave", sortable: true, center: true },
	{ name: "NOMBRE", selector: "nombre", sortable: true },
	{ name: "TIPO", selector: "tipo", sortable: true },
	{ name: "MUNICIPIO", selector: "municipio", sortable: true },
	{ name: "ESTADO", selector: "estado", sortable: true }
];

export const permisosColumns = [
	{ name: "id", selector: "id", omit: true },
	{ name: "PERMISO", selector: "numeroPermiso", sortable: true, width: "110px" },
	{ name: "CUENTA", selector: "cuenta", sortable: true, width: "80px" },
	{ name: "USUARIO", selector: "usuario", sortable: true, width: "250px" },
	{ name: "PRODUCTOR", selector: "nombreProductor", width: "250px", sortable: true },
	{ name: "CULTIVO", selector: "nombreCultivo", width: "150px", sortable: true },
	{ name: "HA", selector: "supAutorizada", width: "60px", sortable: true, center: true },
	{ name: "LOTE", selector: "lote", sortable: true, width: "60px", center: true },
	{ name: "LOCALIDAD", selector: "localidad", sortable: true, width: "150px" },
	{ name: "EMISIÓN", selector: "fechaEmicion", sortable: true, width: "100px" },
	{ name: "VIGENCIA", selector: "vigencia", sortable: true, width: "100px" },
	{ name: "ESTADO", selector: "estadoPermiso", sortable: true, width: "100px" }
];

export const printPermisosColumns = [
	{ name: "id", selector: "id", omit: true },
	{ name: "PERMISO", selector: "numeroPermiso", sortable: true, width: "70px" },
	{ name: "CUENTA", selector: "cuenta", sortable: true, width: "60px" },
	{ name: "USUARIO", selector: "usuario", sortable: true, width: "180px" },
	{ name: "PRODUCTOR", selector: "nombreProductor", width: "140px", sortable: true },
	{ name: "CULTIVO", selector: "nombreCultivo", width: "70px", sortable: true },
	{ name: "HA", selector: "supAutorizada", width: "60px", sortable: true, center: true },
	{ name: "LOTE", selector: "lote", sortable: true, width: "40px", center: true },
	{ name: "LOCALIDAD", selector: "localidad", sortable: true, width: "80px" },
	{ name: "EMISIÓN", selector: "fechaEmicion", sortable: true, width: "70px" },
	// { name: "VIGENCIA", selector: "vigencia", sortable: true, width: "70px" },
	{ name: "ESTADO", selector: "estadoPermiso", sortable: true, width: "70px" },
	{ name: "CUOTA", selector: "cuotaCultivo", width: "60px", sortable: true, center: true },
	{ name: "SISTEMA", selector: "sistema", width: "60px", sortable: true }
];

export const autorizadosColumns = [
	{ name: "id", selector: "id", omit: true },
	{ name: "CLAVE", selector: "clave", sortable: true, width: "80px", center: true },
	{ name: "CULTIVO", selector: "cultivo", sortable: true, width: "160px" },
	{
		name: "GRAVEDAD NORMAL AUTORIZADA",
		selector: "gravedadNormalAutorizada",
		sortable: true,
		center: true
	},
	{
		name: "GRAVEDAD NORMAL ASIGNADA",
		selector: "gravedadNormalAsignada",
		sortable: true,
		center: true
	},
	{
		name: "GRAVEDAD EXTRA AUTORIZADA",
		selector: "gravedadExtraAutorizada",
		sortable: true,
		center: true
	},
	{
		name: "GRAVEDAD EXTRA ASIGNADA",
		selector: "gravedadExtraAsignada",
		sortable: true,
		center: true
	},
	{
		name: "POZO NORMAL AUTORIZADA",
		selector: "pozoNormalAutorizada",
		sortable: true,
		center: true
	},
	{ name: "POZO NORMAL ASIGNADA", selector: "pozoNormalAsignada", sortable: true, center: true },
	{
		name: "POZO EXTRA AUTORIZADA",
		selector: "pozoExtraAutorizada",
		sortable: true,
		center: true
	},
	{ name: "POZO EXTRA ASIGNADA", selector: "pozoExtraAsignada", sortable: true, center: true }
];

export const autorizadosPozoColumns = [
	{ name: "id", selector: "id", omit: true },
	{ name: "CLAVE", selector: "clave", sortable: true, width: "80px", center: true },
	{ name: "CULTIVO", selector: "cultivo", sortable: true, width: "160px" },
	{
		name: "POZO NORMAL AUTORIZADA",
		selector: "pozoNormalAutorizada",
		sortable: true,
		center: true
	},
	{ name: "POZO NORMAL ASIGNADA", selector: "pozoNormalAsignada", sortable: true, center: true },
	{
		name: "POZO EXTRA AUTORIZADA",
		selector: "pozoExtraAutorizada",
		sortable: true,
		center: true
	},
	{ name: "POZO EXTRA ASIGNADA", selector: "pozoExtraAsignada", sortable: true, center: true }
];
