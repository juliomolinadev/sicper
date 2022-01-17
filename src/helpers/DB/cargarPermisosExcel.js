import { setUpdatingPermisos, unsetUpdatingPermisos } from "../../actions/ui";
import Swal from "sweetalert2";
import { readExcel } from "../functions/readExcel";
import { db } from "../../firebase/firebase-config";

export const cargarPermisosExcel = (file, ciclo) => {
	return async (dispatch) => {
		await dispatch(setUpdatingPermisos());

		const data = await readExcel(file);

		let batch = db.batch();
		let i = 1;
		const batchSize = 500;

		await data.forEach((element) => {
			const modulo = defineModulo(element.modulo);
			const folio = defineFolio(modulo, element.folio);
			const cuenta = defineCuenta(`${element.cuenta}`);

			const itemToUpload = {
				folio,
				modulo,
				cuenta,
				nombre: element.nombre.trim(),
				cultivo: element.cultivo.trim(),
				superficie: element.superficie,
				lote: `${element.lote}`,
				ubicacion: element.ubicación.trim(),
				estadoPermiso: "Activo",
				laboresPendientes: true,
				ciclo: "2020-2021",
				tecnico: ""
			};

			const ref = db
				.collection("permisos")
				.doc(ciclo)
				.collection("modulos")
				.doc(`Modulo-${itemToUpload.modulo}`)
				.collection("permisos")
				.doc(itemToUpload.folio);
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
				console.log("Se terminaron de subir los permisos");
				Swal.fire("Permisos actualizados", "Se subieron con exito los permisos.", "success");
				dispatch(unsetUpdatingPermisos());
			})
			.catch((err) => {
				console.error(err);
			});
	};
};

const defineModulo = (word) => {
	const parts = word.split(" ");
	if (parts[0] === "Modulo") return parts[1];
	else if (parts[0] === "Unidad") return `UNI0${parts[1]}`;
	else return "XXXXXX";
};

const defineCuenta = (word) => {
	const parts = word.split(".");

	if (parts.length === 1) return `${parts[0]}.0`;
	else return word;
};

const defineFolio = (modulo, folio) => {
	switch (modulo) {
		case "UNI01":
		case "UNI02":
		case "UNI03":
			return `${modulo}-${folio}`;

		default:
			return `MOD${modulo}-${folio}`;
	}
};
