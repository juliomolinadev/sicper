export const modulosPorUnidad = {
	primeraUnidad: { 4: false, 5: false, 6: false, 14: false, 15: false, 16: false },
	segundaUnidad: {
		7: false,
		8: false,
		"9A": false,
		"9B": false,
		10: false,
		11: false,
		12: false,
		17: false,
		18: false,
		19: false,
		20: false
	},
	terceraUnidad: { 1: false, 2: false, 3: false, 21: false, 22: false, 23: false }
};

export const modulosPorEstado = {
	bc: [
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"92",
		"10",
		"11",
		"12",
		"14",
		"15",
		"16",
		"17",
		"18",
		"19",
		"20",
		"21",
		"22",
		"FL"
	],
	sonora: ["1", "2", "3"]
};

export const cultivosPrincipales = {
	"OTOÑO-INVIERNO": {
		"3-TRIGO": {},
		"8-AVENA": {},
		"2-CEBADA": {},
		"4-RYE-GRASS": {},
		"12-CEBOLLIN O-I": {},
		VARIOS: {},
		SUBTOTAL: {}
	},
	PERENNES: {
		"50-ALFALFA": {},
		"52-ESPARRAGO": {},
		"53-VID": {},
		FRUTALES: {},
		"117-ZACATE BERMUDA": {},
		"60-PALMA DATILERA": {},
		VARIOS: {},
		SUBTOTAL: {}
	},
	"PRIMAVERA-VERANO": {
		"80-ALGODONERO": {},
		"81-SORGO GRANO TEMP.(SUDAN)": {},
		"82-SORGO GRANO TARDIO": {},
		"83-SORGO FORRAJERO TEMP.(SUDAN)": {},
		"84-SORGO FORRAJERO TARDIO": {},
		"87-MAIZ BLANCO TEMPRANO": {},
		"88-MAIZ BLANCO TARDIO": {},
		"12.1-CEBOLLIN P-V": {},
		"12.2-CEBOLLIN TARDIO": {},
		VARIOS: {},
		SUBTOTAL: {}
	}
};

export const modulos = [
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	"9A",
	"9B",
	10,
	11,
	12,
	14,
	15,
	16,
	17,
	18,
	19,
	20,
	21,
	22,
	23,
	"dev",
	"Pozo Particular"
];

export const privileges = {
	//Ui
	accesoGlobal: false,

	//Pantallas
	pantallaInicio: false,
	pantallaPadron: false,
	pantallaPermisos: false,
	pantallaTransferencias: false,
	pantallaAsignacion: false,
	pantallaLabores: false,
	pantallaAutorizados: false,
	pantallaReportes: false,
	pantallaConfiguracion: false,
	testArea: false,

	//Padron
	actualizarPadron: false,

	//Permisos
	expedirPermisos: false,
	consultarPermisos: false,
	solicitarCancelarPermisos: false,
	cancelarPermisos: false,
	consultarExpedicion: false,

	//Autorizados
	consultarAutorizados: false,

	//Transferencias
	solicitarTransferencias: false,

	//Labores
	asignarTécnico: false,
	consultarLabores: false,
	registrarLabores: false,
	pagarLabores: false,
	imprimirLabores: false,

	//Configuracion
	editarEntidades: false,
	asignarRoles: false,
	editarRoles: false,
	cerrarExpedicionModulos: false,
	variablesGlobales: false
};

export const entidades = [
	{
		clave: "dev",
		dotacionGravedad: 117,
		dotacionPozo: 0,
		titular: "dev",
		direccion: "",
		nombre: "Desarrollo",
		img: "dev.png",
		expedicionActivaModulo: true
	},
	{
		clave: "CNA",
		dotacionGravedad: 117,
		dotacionPozo: 0,
		nombre: "Comisión Nacional del Agua",
		titular: "???",
		direccion: "",
		img: "cna.png"
	},
	{
		clave: "SADER",
		dotacionGravedad: 117,
		dotacionPozo: 0,
		nombre: "Secretaría de Agricultura y Desarrollo Rural",
		titular: "???",
		direccion: "",
		img: "sader.png"
	},
	{
		clave: "CESVBC",
		dotacionGravedad: 117,
		dotacionPozo: 0,
		nombre: "Comité Estatal de Sanidad Vegetal de Baja California",
		titular: "???",
		direccion: "",
		img: "cesvbc.webp"
	},
	{
		clave: "SRL",
		dotacionGravedad: 117,
		dotacionPozo: 0,
		nombre: "Distrito de Riego 014, Río Colorado S. de R.L.",
		titular: "???",
		direccion: "",
		img: "srl.png"
	},
	{
		clave: "1",
		dotacionGravedad: 117,
		dotacionPozo: 0,
		nombre: "Usuarios del módulo No. 1",
		titular: "???",
		direccion: "",
		img: "m1.jpg",
		expedicionActivaModulo: true
	},
	{
		clave: "2",
		dotacionGravedad: 117,
		dotacionPozo: 0,
		nombre: "Usuarios del módulo No. 2",
		titular: "???",
		direccion: "",
		img: "m2.jpg",
		expedicionActivaModulo: true
	},
	{
		clave: "3",
		dotacionGravedad: 117,
		dotacionPozo: 0,
		nombre: "Usuarios del módulo No. 3",
		titular: "???",
		direccion: "",
		img: "m3.jpg",
		expedicionActivaModulo: true
	},
	{
		clave: "4",
		dotacionGravedad: 117,
		dotacionPozo: 0,
		nombre: "Usuarios del módulo No. 4",
		titular: "???",
		direccion: "",
		img: "m4.jpg",
		expedicionActivaModulo: true
	},
	{
		clave: "5",
		dotacionGravedad: 117,
		dotacionPozo: 0,
		nombre: "Usuarios del módulo No. 5",
		titular: "???",
		direccion: "",
		img: "m5.jpg",
		expedicionActivaModulo: true
	},
	{
		clave: "6",
		dotacionGravedad: 117,
		dotacionPozo: 0,
		nombre: "Usuarios del módulo No. 6",
		titular: "???",
		direccion: "",
		img: "m6.jpg",
		expedicionActivaModulo: true
	},
	{
		clave: "7",
		dotacionGravedad: 117,
		dotacionPozo: 0,
		nombre: "Usuarios del módulo No. 7",
		titular: "???",
		direccion: "",
		img: "m7.jpg",
		expedicionActivaModulo: true
	},
	{
		clave: "8",
		dotacionGravedad: 117,
		dotacionPozo: 0,
		nombre: "Usuarios del módulo No. 8",
		titular: "???",
		direccion: "",
		img: "m8.jpg",
		expedicionActivaModulo: true
	},
	{
		clave: "9A",
		dotacionGravedad: 117,
		dotacionPozo: 0,
		nombre: "Usuarios del módulo No. 9A",
		titular: "???",
		direccion: "",
		img: "m9a.jpg",
		expedicionActivaModulo: true
	},
	{
		clave: "9B",
		dotacionGravedad: 117,
		dotacionPozo: 0,
		nombre: "Usuarios del módulo No. 9B",
		titular: "???",
		direccion: "",
		img: "m9b.jpg",
		expedicionActivaModulo: true
	},
	{
		clave: "10",
		dotacionGravedad: 117,
		dotacionPozo: 0,
		nombre: "Usuarios del módulo No. 10",
		titular: "???",
		direccion: "",
		img: "m10.jpg",
		expedicionActivaModulo: true
	},
	{
		clave: "11",
		dotacionGravedad: 117,
		dotacionPozo: 0,
		nombre: "Usuarios del módulo No. 11",
		titular: "???",
		direccion: "",
		img: "m11.jpg",
		expedicionActivaModulo: true
	},
	{
		clave: "12",
		dotacionGravedad: 117,
		dotacionPozo: 0,
		nombre: "Usuarios del módulo No. 12",
		titular: "???",
		direccion: "",
		img: "m12.jpg",
		expedicionActivaModulo: true
	},
	{
		clave: "14",
		dotacionGravedad: 117,
		dotacionPozo: 0,
		nombre: "Usuarios del módulo No. 14",
		titular: "???",
		direccion: "",
		img: "m14.jpg",
		expedicionActivaModulo: true
	},
	{
		clave: "15",
		dotacionGravedad: 117,
		dotacionPozo: 0,
		nombre: "Usuarios del módulo No. 15",
		titular: "???",
		direccion: "",
		img: "m15.jpg",
		expedicionActivaModulo: true
	},
	{
		clave: "16",
		dotacionGravedad: 117,
		dotacionPozo: 0,
		nombre: "Usuarios del módulo No. 16",
		titular: "???",
		direccion: "",
		img: "m16.jpg",
		expedicionActivaModulo: true
	},
	{
		clave: "17",
		dotacionGravedad: 117,
		dotacionPozo: 0,
		nombre: "Usuarios del módulo No. 17",
		titular: "???",
		direccion: "",
		img: "m17.jpg",
		expedicionActivaModulo: true
	},
	{
		clave: "18",
		dotacionGravedad: 117,
		dotacionPozo: 0,
		nombre: "Usuarios del módulo No. 18",
		titular: "???",
		direccion: "",
		img: "m18.jpg",
		expedicionActivaModulo: true
	},
	{
		clave: "19",
		dotacionGravedad: 117,
		dotacionPozo: 0,
		nombre: "Usuarios del módulo No. 19",
		titular: "???",
		direccion: "Carretera a San Felipe Km 1.5 S/N, Col. Xochimilco C.P. 21380. Mexicali B.C.",
		img: "m19.png",
		expedicionActivaModulo: true
	},
	{
		clave: "20",
		dotacionGravedad: 117,
		dotacionPozo: 0,
		nombre: "Usuarios del módulo No. 20",
		titular: "???",
		direccion: "",
		img: "m20.jpg",
		expedicionActivaModulo: true
	},
	{
		clave: "21",
		dotacionGravedad: 117,
		dotacionPozo: 0,
		nombre: "Usuarios del módulo No. 21",
		titular: "???",
		direccion: "",
		img: "m21.jpg",
		expedicionActivaModulo: true
	},
	{
		clave: "22",
		dotacionGravedad: 117,
		dotacionPozo: 0,
		nombre: "Usuarios del módulo No. 22",
		titular: "???",
		direccion: "",
		img: "m22.jpg",
		expedicionActivaModulo: true
	},
	{
		clave: "23",
		dotacionGravedad: 117,
		dotacionPozo: 0,
		nombre: "Usuarios del módulo No. 23",
		titular: "???",
		direccion: "",
		img: "srl.png",
		expedicionActivaModulo: true
	}
];

export const testUsers = [
	{
		CUENTA: "dev",
		SUBCTA: 0,
		UNIDAD: 2,
		ZONA: "dev",
		SECCION: 86,
		CP: 1,
		LT: 32,
		SLT: 0,
		RA: 0,
		SRA: 0,
		SSRA: 0,
		PCONTROL: 300,
		TENENCIA: 1,
		ESTADO: 2,
		MUNICIPIO: 2,
		EJIDO: 224,
		GRUPO: 0,
		PREDIO: 23,
		SISTRIEGO: 1,
		EQUIPO: 0,
		APPATERNO: "LOPEZ",
		APMATERNO: "LOPEZ",
		NOMBRE: "JUAN DEV",
		SUPFISICA: 100,
		SUPRIEGO: 100,
		FECHA: "",
		REFERENCIA: 3606,
		MODULO: "dev"
	},

	{
		CUENTA: "dev",
		SUBCTA: 1,
		UNIDAD: 2,
		ZONA: "dev",
		SECCION: 88,
		CP: 1,
		LT: 5,
		SLT: 0,
		RA: 0,
		SRA: 0,
		SSRA: 0,
		PCONTROL: 300,
		TENENCIA: 1,
		ESTADO: 2,
		MUNICIPIO: 2,
		EJIDO: 151,
		GRUPO: 0,
		PREDIO: 23,
		SISTRIEGO: 2,
		EQUIPO: 1,
		APPATERNO: "LOPEZ",
		APMATERNO: "GOMEZ",
		NOMBRE: "LUIS DEV",
		SUPFISICA: 100,
		SUPRIEGO: 100,
		FECHA: "",
		REFERENCIA: 3606,
		MODULO: "dev"
	},

	{
		CUENTA: "dev",
		SUBCTA: 2,
		UNIDAD: 2,
		ZONA: "dev",
		SECCION: 90,
		CP: 1,
		LT: 12,
		SLT: 0,
		RA: 0,
		SRA: 0,
		SSRA: 0,
		PCONTROL: 300,
		TENENCIA: 1,
		ESTADO: 2,
		MUNICIPIO: 2,
		EJIDO: 224,
		GRUPO: 0,
		PREDIO: 23,
		SISTRIEGO: 2,
		EQUIPO: 2,
		APPATERNO: "LOPEZ",
		APMATERNO: "HERNANDEZ",
		NOMBRE: "CARLOS DEV",
		SUPFISICA: 100,
		SUPRIEGO: 100,
		FECHA: "",
		REFERENCIA: 3606,
		MODULO: "dev"
	}
];
