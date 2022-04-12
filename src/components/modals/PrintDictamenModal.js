import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";

import { startCloseSanidadModal, updatePermiso } from "../../actions/algodoneroScreen";
import { enablePrintButton } from "../../actions/transferenciasScreen";
import { saveConstanciaSanidad } from "../../helpers/saveConsatanciaSanidad";
import { updatePermisoAlgodonero } from "../../helpers/updatePermisoAlgodonero";

export const PrintDictamenModal = () => {
	const { printSanidadModal, technicians } = useSelector((state) => state.algodoneroScreen);
	const tecnico = technicians.find((tecnico) => tecnico.id === printSanidadModal.tecnico);
	const { transferPrintButton } = useSelector((state) => state.transferenciasScreen);

	const dispatch = useDispatch();

	const closeModal = () => {
		dispatch(startCloseSanidadModal());
	};

	const imprimir = () => {
		window.print();
	};

	const customStyles = {
		content: {
			width: "1125px",
			height: "1500px",
			overflow: "auto"
		}
	};

	const handleSaveConstancy = async () => {
		const isSave = await saveConstanciaSanidad(
			{ ...printSanidadModal, folioSanidad: printSanidadModal.folioSanidad },
			"2020-2021"
		);

		if (isSave) {
			dispatch(enablePrintButton());
			updatePermisoAlgodonero(printSanidadModal.folio, printSanidadModal.modulo, "2020-2021", {
				folioSanidad: printSanidadModal.folioSanidad
			});
			dispatch(
				updatePermiso({ ...printSanidadModal, folioSanidad: printSanidadModal.folioSanidad })
			);
		}
	};

	const dateOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
	const fecha = new Date();

	return (
		<Modal
			isOpen={true}
			onRequestClose={closeModal}
			style={customStyles}
			closeTimeoutMS={200}
			className="printModalSanidad"
			overlayClassName="modal-fondo"
		>
			<div className="row p-5">
				<div className="col-2">
					<div className="d-flex justify-content-center">
						<img src={"./logos/sader.png"} alt="Logo sader" style={{ maxHeight: 50 }} />
					</div>
				</div>
				<div className="col-8 text-center">
					<h5>
						SECRETARIA DE AGRICULTURA Y DESARROLLO RURAL <br />
						REPRESENTACION ESTATAL EN BAJA CALIFORNIA <br />
						COMITÉ ESTATAL DE SANIDAD VEGETAL DE BAJA CALIFORNIA <br />
						DICTAMEN TECNICO DE SIEMBRA CULTIVO ALGODONERO <br />
						CICLO PRIMAVERA VERANO 2022-22
					</h5>
				</div>
				<div className="col-2">
					<div className="d-flex-column justify-content-center">
						<img src={"./logos/cesvbc.webp"} alt="Logo sanidad vegetal" style={{ maxHeight: 80 }} />
					</div>
				</div>
			</div>

			<div className="row pt-5"></div>

			<div className="d-flex justify-content-end pt-5">
				<p>MEXICALI, B. C. , A {fecha.toLocaleString("es-MX", dateOptions).toUpperCase()}</p>
			</div>

			<div className="row pt-5"></div>
			<div className="row pt-5"></div>
			<div className="row pl-5 pr-5 m-2">NOMBRE DEL PRODUCTOR: PRODUCTOR</div>
			<div className="row pl-5 pr-5 m-2">NOMBRE DEL PROPIETARIO: PROPIETARIO</div>
			<div className="row pl-5 pr-5 mt-2 mb-2">
				<div className="col-4 pl-4">UBICACION: COLONIA</div>
				<div className="col-2">PARCELA: LOTE</div>
				<div className="col-2">SUP: HA</div>
				<div className="col-4">CADER: CADER</div>
			</div>
			<div className="row pl-5 pr-5 mt-2 mb-2">
				<div className="col-5 pl-4">HABILITADORA: HABILITADORA</div>
				<div className="col-2">MODULO: MODULO</div>
				<div className="col-5">CADER: CADER</div>
			</div>

			<div className="row pt-5"></div>
			<div className="row pt-5"></div>

			<div className="row pl-5 pr-5 m-2">LABORES CULTURALES: PRODUCTOR</div>
			<div className="row pl-5 pr-5 m-2">FECHA DE RIEGO: PRODUCTOR</div>
			<div className="row pl-5 pr-5 m-2">FECHA DE SIEMBRA EN SECO: PRODUCTOR</div>
			<div className="row pl-5 pr-5 m-2">FECHA DE SIEMBRA EN HUMEDO: PRODUCTOR</div>
			<div className="row pl-5 pr-5 m-2">DICTAMEN TECNICO: PRODUCTOR</div>

			<div className="row pt-5"></div>
			<div className="row pl-5 pr-5 m-2">
				OBSERVACIONES:
				<div className="d-block w-100 rounded border" style={{ height: 100 }}>
					Observaciones
				</div>
			</div>

			<div className="row pt-5"></div>
			<div className="row pt-5"></div>

			<div className="row pt-5 d-flex justify-content-center">
				<div className="col-4 d-flex flex-column ml-3">
					<p className="pb-5 text-center">CESVBC</p>
					<hr />
					<div className="text-center">
						<b>NOMBRE Y FIRMA</b>
					</div>
				</div>

				<div className="col-4 d-flex flex-column ml-3">
					<p className="pb-5 text-center">SADER</p>
					<hr />
					<div className="text-center">
						<b>NOMBRE Y FIRMA</b>
					</div>
				</div>
			</div>

			<div className="row m-3 d-flex justify-content-center pt-5">
				{transferPrintButton ? (
					<button type="button" className="btn btn-outline-primary d-print-none" onClick={imprimir}>
						<i className="fas fa-print"></i>
						<span> Imprimir</span>
					</button>
				) : (
					<button
						type="button"
						className="btn btn-outline-primary ml-5 d-print-none"
						onClick={handleSaveConstancy}
					>
						<i className="fas fa-save"></i>
						<span> Guardar </span>
					</button>
				)}

				<button
					type="button"
					className="btn btn-outline-primary ml-5 d-print-none ml-3"
					onClick={closeModal}
				>
					<i className="fas fa-sign-out-alt"></i>
					<span> Cerrar</span>
				</button>
			</div>
		</Modal>
	);
};
