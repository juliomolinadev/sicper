import { db } from "../../firebase/firebase-config";
import Swal from "sweetalert2";
import { setUpdatingReacomodos, unsetUpdatingReacomodos } from "../../actions/usuarios";
import { readExcel } from "../functions/readExcel";

export const updateReacomodos = (file) => {
	return async (dispatch) => {
		Swal.fire({
			title: "Verificando archivo...",
			text: "Por favor espere...",
			allowOutsideClick: false,
			showConfirmButton: false,
			didOpen: () => {
				Swal.showLoading();
			}
		});

		await dispatch(setUpdatingReacomodos());

		const nuevoPadron = await readExcel(file);
		const idsPadronAnterior = [];

		let batch = db.batch();
		let i = 1;
		const batchSize = 350;

		if (checkReacomodos(nuevoPadron)) {
			Swal.update({
				title: "Cargando padrón...",
				allowOutsideClick: false,
				showConfirmButton: false
			});

			const padronAnterior = await db.collection("reacomodos").get();
			padronAnterior.forEach((reacomodo) => idsPadronAnterior.push(reacomodo.id));

			await nuevoPadron.forEach((element) => {
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

				const index = idsPadronAnterior.indexOf(`${itemToUpload.cuenta}-${itemToUpload.subCuenta}`);
				if (index !== -1) idsPadronAnterior.splice(index, 1);

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

			idsPadronAnterior.forEach((id) => {
				const ref = db.collection("reacomodos").doc(id);
				batch.delete(ref);
			});

			batch
				.commit()
				.then(() => {
					console.log("Se terminaron de actualizar los reacomodos");
					Swal.close();
					Swal.fire(
						"Reacomodos actualizados",
						`Se actualizaron con éxito los reacomodos.
						${nuevoPadron.length} registros procesados.
						${idsPadronAnterior.length} registros eliminados.
						`,
						"success"
					);
					dispatch(unsetUpdatingReacomodos());
				})
				.catch((err) => {
					console.error(err);
				});

			console.log(idsPadronAnterior);
		} else {
			dispatch(unsetUpdatingReacomodos());
			Swal.close();
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
