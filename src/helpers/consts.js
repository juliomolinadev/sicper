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
	terceraUnidad: { 1: false, 2: false, 3: false, 21: false, 22: false, FL: false }
};

export const modulosPorEstado = {
	bc: [
		"4",
		"5",
		"6",
		"7",
		"8",
		"9A",
		"9B",
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
	9,
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
	"FL",
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
	actualizarEntidades: false,
	asignarRoles: false,
	editarRoles: false
};

export const entidades = [
	{
		clave: "dev",
		dotacion: 117,
		titular: "dev",
		direccion: "",
		nombre: "Desarrollo",
		img: "dev.png"
	},
	{
		clave: "CNA",
		dotacion: 117,
		nombre: "Comisión Nacional del Agua",
		titular: "???",
		direccion: "",
		img: "cna.png"
	},
	{
		clave: "SADER",
		dotacion: 117,
		nombre: "Secretaría de Agricultura y Desarrollo Rural",
		titular: "???",
		direccion: "",
		img: "sader.png"
	},
	{
		clave: "CESVBC",
		dotacion: 117,
		nombre: "Comité Estatal de Sanidad Vegetal de Baja California",
		titular: "???",
		direccion: "",
		img: "cesvbc.webp"
	},
	{
		clave: "SRL",
		dotacion: 117,
		nombre: "Distrito de Riego 014, Río Colorado S. de R.L.",
		titular: "???",
		direccion: "",
		img: "srl.png"
	},
	{
		clave: "1",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 1",
		titular: "???",
		direccion: "",
		img: "m1.jpg"
	},
	{
		clave: "2",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 2",
		titular: "???",
		direccion: "",
		img: "m2.jpg"
	},
	{
		clave: "3",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 3",
		titular: "???",
		direccion: "",
		img: "m3.jpg"
	},
	{
		clave: "4",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 4",
		titular: "???",
		direccion: "",
		img: "m4.jpg"
	},
	{
		clave: "5",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 5",
		titular: "???",
		direccion: "",
		img: "m5.jpg"
	},
	{
		clave: "6",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 6",
		titular: "???",
		direccion: "",
		img: "m6.jpg"
	},
	{
		clave: "7",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 7",
		titular: "???",
		direccion: "",
		img: "m7.jpg"
	},
	{
		clave: "8",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 8",
		titular: "???",
		direccion: "",
		img: "m8.jpg"
	},
	{
		clave: "9",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 9A",
		titular: "???",
		direccion: "",
		img: "m9a.jpg"
	},
	{
		clave: "92",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 9B",
		titular: "???",
		direccion: "",
		img: "m9b.jpg"
	},
	{
		clave: "10",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 10",
		titular: "???",
		direccion: "",
		img: "m10.jpg"
	},
	{
		clave: "11",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 11",
		titular: "???",
		direccion: "",
		img: "m11.jpg"
	},
	{
		clave: "12",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 12",
		titular: "???",
		direccion: "",
		img: "m12.jpg"
	},
	{
		clave: "14",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 14",
		titular: "???",
		direccion: "",
		img: "m14.jpg"
	},
	{
		clave: "15",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 15",
		titular: "???",
		direccion: "",
		img: "m15.jpg"
	},
	{
		clave: "16",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 16",
		titular: "???",
		direccion: "",
		img: "m16.jpg"
	},
	{
		clave: "17",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 17",
		titular: "???",
		direccion: "",
		img: "m17.jpg"
	},
	{
		clave: "18",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 18",
		titular: "???",
		direccion: "",
		img: "m18.jpg"
	},
	{
		clave: "19",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 19",
		titular: "???",
		direccion: "Carretera a San Felipe Km 1.5 S/N, Col. Xochimilco C.P. 21380. Mexicali B.C.",
		img: "m19.png"
	},
	{
		clave: "20",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 20",
		titular: "???",
		direccion: "",
		img: "m20.jpg"
	},
	{
		clave: "21",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 21",
		titular: "???",
		direccion: "",
		img: "m21.jpg"
	},
	{
		clave: "22",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 22",
		titular: "???",
		direccion: "",
		img: "m22.jpg"
	},
	{
		clave: "23",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 23",
		titular: "???",
		direccion: "",
		img: "srl.png"
	}
];
