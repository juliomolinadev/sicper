import { db } from "../../firebase/firebase-config";
import Swal from "sweetalert2";
import { setUpdatingPadron, unsetUpdatingPadron } from "../../actions/usuarios";
import { readExcel } from "../functions/readExcel";
import { loadLocalties } from "./loadLocalties";
import { loadReacomodos } from "./loadReacomodos";

export const updatePadron = (file) => {
	return async (dispatch) => {
		await dispatch(setUpdatingPadron());
		const localties = await loadLocalties("");
		const reacomodos = await loadReacomodos();

		const data = await readExcel(file);
		let batch = db.batch();
		let i = 1;
		const batchSize = 500;

		if (checkPadron(data)) {
			await data.forEach((usuario, i) => {
				const reacomodo = reacomodos.find(
					(reacomodo) => reacomodo.id === `${usuario.CUENTA}-${usuario.SUBCTA}`
				);
				if (reacomodo) {
					data[i].reacomodo = reacomodo.reacomodo;
				}
			});

			await data.forEach((usuario, i) => {
				const localidad = getLocaltie(localties, usuario.EJIDO);
				data[i].nombreLocalidad = localidad;
			});

			await data.forEach((element) => {
				const itemToUpload = {
					apMaterno: element.APMATERNO !== undefined ? element.APMATERNO : "?",
					apPaterno: element.APPATERNO !== undefined ? element.APPATERNO : "?",
					cp: element.CP !== undefined ? element.CP : "?",
					cuenta: element.CUENTA !== undefined ? element.CUENTA : "?",
					ejido: element.EJIDO !== undefined ? element.EJIDO : "?",
					nombreLocalidad: element.nombreLocalidad,
					equipo: element.EQUIPO !== undefined ? element.EQUIPO : "?",
					estado: element.ESTADO !== undefined ? element.ESTADO : "?",
					fecha: element.FECHA !== undefined ? element.FECHA : "?",
					grupo: element.GRUPO !== undefined ? element.GRUPO : "?",
					lt: element.LT !== undefined ? element.LT : "?",
					modulo: element.ZONA !== undefined ? defineModulo(element.ZONA) : "?",
					municipio: element.MUNICIPIO !== undefined ? element.MUNICIPIO : "?",
					nombre: element.NOMBRE !== undefined ? element.NOMBRE : "?",
					pControl: element.PCONTROL !== undefined ? element.PCONTROL : "?",
					predio: definePredio(element.GRUPO, element.PREDIO),
					ra: element.RA !== undefined ? element.RA : "?",
					referencia: element.REFERENCIA !== undefined ? element.REFERENCIA : "?",
					seccion: element.SECCION !== undefined ? element.SECCION : "?",
					sistRiego: element.SISTRIEGO !== undefined ? element.SISTRIEGO : "?",
					sistemaRiego: defineSistema(element.SISTRIEGO, element.EQUIPO),
					slt: element.SLT !== undefined ? element.SLT : "?",
					sra: element.SRA !== undefined ? element.SRA : "?",
					ssra: element.SSRA !== undefined ? element.SSRA : "?",
					subcta: element.SUBCTA !== undefined ? element.SUBCTA : "?",
					supFisica: element.SUPFISICA !== undefined ? element.SUPFISICA : "?",
					supRiego: element.SUPRIEGO !== undefined ? element.SUPRIEGO : "?",
					tenencia: element.TENENCIA !== undefined ? element.TENENCIA : "?",
					unidad: element.UNIDAD !== undefined ? element.UNIDAD : "?",
					zona: element.ZONA !== undefined ? element.ZONA : "?",
					reacomodo: element.reacomodo !== undefined ? element.reacomodo : false
				};

				const ref = db.collection("derechos").doc(`${itemToUpload.cuenta}-${itemToUpload.subcta}`);
				batch.set(ref, itemToUpload);
				if (i === batchSize) {
					batch
						.commit()
						.then(() => {
							console.log("Se termino de subir batch");
						})
						.catch((err) => {
							console.error(err);
						});
					batch = db.batch();
					i = 0;
				}

				i++;
			});

			batch
				.commit()
				.then(() => {
					console.log("Se termino de actualizar el padron");
					Swal.fire(
						"Padron actualizado",
						"Se actualizo con éxito el padrón de usuarios.",
						"success"
					);
					dispatch(unsetUpdatingPadron());
				})
				.catch((err) => {
					console.error(err);
				});
		} else {
			dispatch(unsetUpdatingPadron());
			Swal.fire(
				"Formato incorrecto",
				"Verifique que el documento que intenta cargar corresponda a un padrón de usuarios válido.",
				"error"
			);
		}
	};
};

const checkPadron = (data) => {
	const items = ["CUENTA", "SUBCTA", "APPATERNO", "UNIDAD", "ZONA", "EJIDO", "SECCION"];
	let isOk = true;

	items.forEach((item) => {
		if (data[0][item] === undefined) isOk = false;
	});

	isOk ? console.log("ok, todo en orden!") : console.log("Esto no es un padron");

	return isOk;
};

const getLocaltie = (localidades, id) => {
	const localtieFind = localidades.find((localtie) => localtie.clave === id);

	if (localtieFind) return localtieFind.nombre;
	else return "?";
};

const definePredio = (grupo, predio) => {
	if (predio >= 0) {
		if (grupo > 0) {
			return `${grupo}${predio}`;
		}
		return predio;
	} else return "?";
};

const defineModulo = (modulo) => {
	if (modulo === 9) return "9A";
	else if (modulo === 92) return "9B";
	else return modulo;
};

const defineSistema = (sistRiego, equipo) => {
	if (sistRiego === 1) return "Gravedad";
	else if (sistRiego === 2 && equipo === 1) return "Pozo Particular";
	else if (sistRiego === 2 && equipo === 2) return "Pozo Federal";
	else return "";
};
