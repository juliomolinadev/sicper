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
