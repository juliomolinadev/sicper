import { db } from "../../firebase/firebase-config";
import Swal from "sweetalert2";

export const hayPermisosExpedidosDelCultivo = async (idCultivo) => {
	Swal.fire({
		title: "Verificando expedición...",
		text: "Por favor espere...",
		allowOutsideClick: false,
		didOpen: () => {
			Swal.showLoading();
		}
	});

	const permisosBatch = await db
		.collectionGroup("permisos")
		.where("idCultivoSelected", "==", idCultivo)
		.get();

	Swal.close();

	if (permisosBatch.size > 0) return true;
	else return false;
};
