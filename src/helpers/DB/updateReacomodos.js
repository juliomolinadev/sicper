import { db } from "../../firebase/firebase-config";
import Swal from "sweetalert2";
import { setUpdatingReacomodos, unsetUpdatingReacomodos } from "../../actions/usuarios";
import { readExcel } from "../functions/readExcel";

export const updateReacomodos = (file) => {
	return async (dispatch) => {
		await dispatch(setUpdatingReacomodos());
		const data = await readExcel(file);
		let batch = db.batch();
		let i = 1;
		const batchSize = 500;

		if (checkReacomodos(data)) {
			data.forEach((element) => {
				const itemToUpload = {
					cuenta: element.CTA !== undefined ? element.CTA : "?",
					subCuenta: element.SC !== undefined ? element.SC : "?",
					llave: element.LLAVE !== undefined ? element.LLAVE : "?",
					modulo: element.MODULO !== undefined ? element.MODULO : "?",
					claveEjido: element.CVEEJI !== undefined ? element.CVEEJI : "?",
					ejido: element.EJI !== undefined ? element.EJI : "?",
					predio: element.PRE !== undefined ? element.PRE : "?",
					hectareas: element.HAS !== undefined ? element.HAS : "?",
					reacomodo: element.RE !== undefined ? element.RE : "?",
					claveProcedencia: element.CVEPRO !== undefined ? element.CVEPRO : "?",
					ejidoProcedencia: element.EJIPRO !== undefined ? element.EJIPRO : "?",
					predioProcedencia: element.PREPRO !== undefined ? element.PREPRO : "?"
				};

				const ref = db
					.collection("reacomodos")
					.doc(`${itemToUpload.cuenta}-${itemToUpload.subCuenta}`);
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
					console.log("Se terminaron de actualizar los reacomodos");
					Swal.fire(
						"Reacomodos actualizados",
						"Se actualizaron con éxito los reacomodos.",
						"success"
					);
					dispatch(unsetUpdatingReacomodos());
				})
				.catch((err) => {
					console.error(err);
				});
		} else {
			dispatch(unsetUpdatingReacomodos());
			Swal.fire(
				"Formato incorrecto",
				"Verifique que el documento que intenta cargar corresponda a una tabla de reacomodos válida.",
				"error"
			);
		}
	};
};

const checkReacomodos = (data) => {
	const items = ["CTA", "SC", "LLAVE", "EJI", "HAS", "RE", "CVEPRO"];
	let isOk = true;

	items.forEach((item) => {
		if (data[0][item] === undefined) isOk = false;
	});

	isOk ? console.log("ok, todo en orden!") : console.log("Esto no es un padron");

	return isOk;
};
