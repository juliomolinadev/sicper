import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";

import { startCloseSanidadModal, updatePermiso } from "../../actions/algodoneroScreen";
import { enablePrintButton } from "../../actions/transferenciasScreen";
import { saveConstanciaSanidad } from "../../helpers/saveConsatanciaSanidad";
import { updatePermisoAlgodonero } from "../../helpers/updatePermisoAlgodonero";

export const PrintSanidadModal = () => {
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
			printSanidadModal.ciclo
		);

		if (isSave) {
			dispatch(enablePrintButton());
			updatePermisoAlgodonero(
				printSanidadModal.numeroPermiso,
				printSanidadModal.modulo,
				printSanidadModal.ciclo,
				{
					folioSanidad: printSanidadModal.folioSanidad
				}
			);
			dispatch(
				updatePermiso({ ...printSanidadModal, folioSanidad: printSanidadModal.folioSanidad })
			);
		}
	};

	const dateOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
	const fecha = new Date();

	return (
		<Modal
			isOpen={printSanidadModal ? true : false}
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
						DISTRITO DE DESARROLLO RURAL 002, RIO COLORADO <br />
						COMITÉ ESTATAL DE SANIDAD VEGETAL DE BAJA CALIFORNIA
					</h5>
				</div>
				<div className="col-2">
					<div className="d-flex-column justify-content-center">
						<img src={"./logos/cesvbc.webp"} alt="Logo sanidad vegetal" style={{ maxHeight: 80 }} />
						<div className="mt-3">
							<b>FOLIO: {printSanidadModal.folioSanidad} </b>
						</div>
					</div>
				</div>
			</div>

			<div className="row pt-5"></div>

			<div className="row dflex justify-content-center">
				<h4>
					<b>CONSTANCIA DE EJECUCIÓN DE LABORES FITOSANITARIAS</b>
				</h4>
			</div>

			<div className="row dflex justify-content-center">
				<h5>
					<b>ALGODONERO CICLO P-V {printSanidadModal.ciclo}</b>
				</h5>
			</div>

			<div className="row pt-5"></div>

			<div className="row d-flex justify-content-center pt-5 text-justify">
				<div className="col-8">
					<p>
						POR LA PRESENTE HACEMOS CONSTAR QUE EL C. {printSanidadModal.usuario}, PRODUCTOR DEL
						LOTE NO.
						{printSanidadModal.lote} DEL EJIDO/COLONIA {printSanidadModal.nombreLocalidad}, REALIZÓ
						LAS LABORES FITOSANITARIAS EN UNA SUPERFICIE DE {printSanidadModal.supAutorizada} HA.
					</p>

					<p>
						DANDO ASÍ CUMPLIMIENTO A LO ESTABLECIDO EN LA LEY FEDERAL DE SANIDAD VEGETAL, LA NORMA
						OFICIAL MEXICANA: NOM-026-SAG/FITO-2014 POR LA QUE SE ESTABLECE EL CONTROL DE PLAGAS
						REGLAMENTADAS DEL ALGODONERO Y LA NOM-081-FITO-2001-MANEJO Y ELIMINACIÓN DE FOCOS DE
						INFESTACIÓN DE PLAGAS, MEDIANTE EL ESTABLECIMIENTO O REORDENAMIENTO DE FECHAS DE
						SIEMBRA, COSECHA Y DESTRUCCIÓN DE RESIDUOS.
					</p>

					<p>SIRVA EL PRESENTE DOCUMENTO PARA LA LIBERACIÓN DE CARTA DE GARANTÍA EMITIDA.</p>

					<p>
						PROPIETARIO: {printSanidadModal.usuario} <br />
						CUENTA: {printSanidadModal.cuenta} <br />
						TÉCNICO: {tecnico ? tecnico.displayName : ""}
					</p>

					<div className=" d-flex justify-content-end pt-5">
						<p>MEXICALI, B. C. , A {fecha.toLocaleString("es-MX", dateOptions).toUpperCase()}</p>
					</div>
				</div>
			</div>

			<div className="row pt-5"></div>
			<div className="row pt-5"></div>
			<div className="row pt-5"></div>
			<div className="row pt-5"></div>

			<div className="row pt-5 d-flex ">
				<div className="col-4 d-flex-column align-items-end justify-content-center">
					<div className="text-center">
						<img
							src={"./logos/sello-cesvbc.png"}
							alt="Sello sanidad vegetal"
							style={{ maxHeight: 150 }}
						/>
					</div>
				</div>

				<div className="col-4 d-flex flex-column ml-3">
					<p className="text-center">NOMBRE Y FIRMA</p>
					<div className="d-flex justify-content-center">
						<img
							// src={`./firmas/31naXMbqQibk1SzOLIhZ5JXFYAk1.png`}
							// src={`./firmas/bHflypkGK8SBj2VAOe6lIccxwbc2.png`}
							// src={`./firmas/GOxDoCdADSSVhj1gQIXxzZ5YN4H3.png`}
							// src={`./firmas/rA5pOGIhqZceAigtDlP0cVy2SwA3.png`}
							// src={`./firmas/rUxW1A8ehVWGYzjK91c8LCwwklb2.png`}
							// src={`./firmas/u2onRGMYn6RqLafQC3LNe2cP64q1.png`}
							src={`./firmas/${tecnico ? tecnico.id : ""}.png`}
							alt="Firma del técnico"
							style={{ maxHeight: 90 }}
						/>
					</div>
					<div className="text-center">{tecnico ? tecnico.displayName : ""}</div>
					<hr />
					<div className="text-center">
						<b>TÉCNICO FITOSANITARIO DEL CESVBC</b>
					</div>
				</div>

				{/* <div className="col-4 d-flex align-items-end justify-content-center">
					<div className="text-center">
						<b>SELLO DE CADER</b>
					</div>
				</div> */}
			</div>

			<div className="row p-5">
				C.c.p. -DISTRITO DE DESARROLLO RURAL 002-RIO COLORADO <br />
				C.c.p. -ARCHIVO
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
