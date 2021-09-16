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
	pantallaInicio: false,
	pantallaPadron: false,
	pantallaPermisos: false,
	pantallaTransferencias: false,
	pantallaAsignacion: false,
	pantallaLabores: false,
	pantallaAutorizados: false,
	pantallaReportes: false,
	pantallaConfiguracion: false,
	consultarExpedicion: false,
	consultarAutorizados: false,
	expedirPermisos: false,
	consultarPermisos: false,
	cancelarPermisos: false,
	solicitarTransferencias: false,
	asignarTécnico: false,
	consultarLabores: false,
	registrarLabores: false,
	pagarLabores: false,
	imprimirLabores: false,
	reportesPermisos: false,
	reportesExpedición: false,
	reportesAutorizados: false,
	asignarRoles: false,
	editarRoles: false,
	testArea: false
};

export const entidades = [
	{
		clave: "dev",
		dotacion: 117,
		titular: "dev",
		nombre: "Desarrollo",
		img: "dev.png"
	},
	{
		clave: "cna",
		dotacion: 117,
		nombre: "Comisión Nacional del Agua",
		titular: "???",
		img: "cna.png"
	},
	{
		clave: "sader",
		dotacion: 117,
		nombre: "Secretaría de Agricultura y Desarrollo Rural",
		titular: "???",
		img: "sader.png"
	},
	{
		clave: "cesvbc",
		dotacion: 117,
		nombre: "Comité Estatal de Sanidad Vegetal de Baja California",
		titular: "???",
		img: "cesvbc.webp"
	},
	{
		clave: "srl",
		dotacion: 117,
		nombre: "Distrito de Riego 014, Río Colorado S. de R.L.",
		titular: "???",
		img: "srl.png"
	},
	{
		clave: "1",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 1",
		titular: "???",
		img: "m1.jpg"
	},
	{
		clave: "2",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 2",
		titular: "???",
		img: "m2.jpg"
	},
	{
		clave: "3",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 3",
		titular: "???",
		img: "m3.jpg"
	},
	{
		clave: "4",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 4",
		titular: "???",
		img: "m4.jpg"
	},
	{
		clave: "5",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 5",
		titular: "???",
		img: "m5.jpg"
	},
	{
		clave: "6",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 6",
		titular: "???",
		img: "m6.jpg"
	},
	{
		clave: "7",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 7",
		titular: "???",
		img: "m7.jpg"
	},
	{
		clave: "8",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 8",
		titular: "???",
		img: "m8.jpg"
	},
	{
		clave: "9",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 9A",
		titular: "???",
		img: "m9a.jpg"
	},
	{
		clave: "92",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 9B",
		titular: "???",
		img: "m9b.jpg"
	},
	{
		clave: "10",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 10",
		titular: "???",
		img: "m10.jpg"
	},
	{
		clave: "11",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 11",
		titular: "???",
		img: "m11.jpg"
	},
	{
		clave: "12",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 12",
		titular: "???",
		img: "m12.jpg"
	},
	{
		clave: "14",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 14",
		titular: "???",
		img: "m14.jpg"
	},
	{
		clave: "15",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 15",
		titular: "???",
		img: "m15.jpg"
	},
	{
		clave: "16",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 16",
		titular: "???",
		img: "m16.jpg"
	},
	{
		clave: "17",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 17",
		titular: "???",
		img: "m17.jpg"
	},
	{
		clave: "18",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 18",
		titular: "???",
		img: "m18.jpg"
	},
	{
		clave: "19",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 19",
		titular: "???",
		img: "m19.png"
	},
	{
		clave: "20",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 20",
		titular: "???",
		img: "m20.jpg"
	},
	{
		clave: "21",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 21",
		titular: "???",
		img: "m21.jpg"
	},
	{
		clave: "22",
		dotacion: 117,
		nombre: "Usuarios del módulo No. 22",
		titular: "???",
		img: "m22.jpg"
	}
];
