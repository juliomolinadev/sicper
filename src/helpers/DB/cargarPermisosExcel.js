import { setUpdatingPermisos, unsetUpdatingPermisos } from "../../actions/ui";
import Swal from "sweetalert2";
import { readExcel } from "../functions/readExcel";
import { db } from "../../firebase/firebase-config";

export const cargarPermisosExcel = (file, ciclo) => {
	return async (dispatch) => {
		await dispatch(setUpdatingPermisos());

		const data = await readExcel(file);
		const localidesSnap = await db.collection("colonias").get();
		const localidades = [];
		// const itemsToUpload = [];

		localidesSnap.forEach((localidad) => {
			localidades.push(localidad.data());
		});

		const itemsToUploadPromises = await data.map(async (permiso) => {
			const cuenta = defineCuenta(`${permiso.cuenta}`, ".");
			const padronId = defineCuenta(`${permiso.cuenta}`, "-");
			const derechos = await db.collection("derechos").doc(padronId).get();
			const labores = defineLabores(permiso.labores ?? "");
			const tecnico = defineTecnico(permiso.tecnico ?? "");

			if (derechos.exists) {
				const modulo = `${derechos.data().modulo}`;
				const folio = defineFolio(modulo, permiso.folio);
				const idLocalidad = derechos.data().ejido;
				const localidad = localidades.find((localidad) => localidad.clave === idLocalidad);

				return {
					...labores,
					folio,
					modulo,
					cuenta,
					nombre: permiso.nombre.trim(),
					cultivo: permiso.cultivo.trim(),
					superficie: permiso.superficie,
					lote: `${permiso.lote}`,
					ubicacion: defineNombe(localidad.nombre, permiso.ubicación),
					claveLocalidad: localidad.clave,
					tipoLocalidad: localidad.tipo,
					estadoPermiso: "Activo",
					laboresPendientes: true,
					ciclo: "2020-2021",
					tecnico
				};
			} else {
				console.log("Cuenta desconocida: ", padronId);
			}
		});

		const itemsToUpload = await Promise.all(itemsToUploadPromises);

		let batch = db.batch();
		let i = 1;
		const batchSize = 500;

		itemsToUpload.forEach((permiso) => {
			if (permiso) {
				const ref = db
					.collection("permisos")
					.doc(ciclo)
					.collection("modulos")
					.doc(`Modulo-${permiso.modulo}`)
					.collection("permisos")
					.doc(permiso.folio);

				batch.set(ref, permiso);
			}

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

// const defineModulo = (word) => {
// 	const parts = word.split(" ");

// 	if (parts.length === 1) return parts[0];
// 	else if (parts[0] === "Modulo") return parts[1];
// 	else if (parts[0] === "Unidad") return `UNI0${parts[1]}`;
// 	else return "XXXXXX";
// };

const defineCuenta = (word, separator) => {
	const parts = word.split(".");

	if (parts.length === 1) return `${parts[0]}${separator}0`;
	else return `${parts[0]}${separator}${parts[1]}`;
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

const defineNombe = (nombrePadron, nombreExcel) => {
	const dividedName = nombrePadron.split(" ");

	if (dividedName[0] === "Desconocido") return nombreExcel.trim();
	else return nombrePadron.trim();
};

const defineLabores = (trabajos) => {
	if (trabajos.trim() === "BARBECHADO") {
		return {
			desfoliado: true,
			cosechado: true,
			desvarado: true,
			disqueado: true,
			desarraigado: true,
			barbechado: true
		};
	} else return {};
};

const defineTecnico = (tecnico) => {
	switch (tecnico.trim()) {
		case "ADRIAN VILLA":
			return "GOxDoCdADSSVhj1gQIXxzZ5YN4H3";

		case "EDUARDO BAÑUELOS":
			return "rUxW1A8ehVWGYzjK91c8LCwwklb2";

		case "EDUARDO ZAVALA":
			return "31naXMbqQibk1SzOLIhZ5JXFYAk1";

		case "GUILEBALDO ZAVALA":
			return "u2onRGMYn6RqLafQC3LNe2cP64q1";

		case "SAUL VEA BERRELLEZA":
			return "rA5pOGIhqZceAigtDlP0cVy2SwA3";

		case "CORNELIO LARA":
			return "bHflypkGK8SBj2VAOe6lIccxwbc2";

		default:
			return "";
	}
};

/* 
31naXMbqQibk1SzOLIhZ5JXFYAk1
7x7LpErVMrcGQDvI5sBflOnzOx12
GOxDoCdADSSVhj1gQIXxzZ5YN4H3
bHflypkGK8SBj2VAOe6lIccxwbc2
rA5pOGIhqZceAigtDlP0cVy2SwA3
rUxW1A8ehVWGYzjK91c8LCwwklb2
u2onRGMYn6RqLafQC3LNe2cP64q1
*/
