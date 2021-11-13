import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";

import { closeTransferModal } from "../../actions/transferenciasScreen";

export const PrintTransferModal = ({ transferencia }) => {
	console.log("transferencia en modal: ", transferencia);
	const {
		ciclo,
		apPaterno,
		apMaterno,
		nombre,
		predio,
		tipoLocalidad,
		nombreLocalidad,
		superficieTransferida,
		nombreCultivo,
		apPaternoSolicitante,
		apMaternoSolicitante,
		nombreSolicitante,
		loteDestino,
		tipolocalidadDestino,
		localidadDestino,
		fecha,
		zona,
		moduloDestino
	} = transferencia;

	const dateOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

	const { printTransferModal } = useSelector((state) => state.transferenciasScreen);

	const dispatch = useDispatch();

	const closeModal = () => {
		dispatch(closeTransferModal());
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

	return (
		<Modal
			isOpen={printTransferModal}
			onRequestClose={closeModal}
			style={customStyles}
			closeTimeoutMS={200}
			className="printModalSanidad p-5"
			overlayClassName="modal-fondo"
		>
			<div className="row p-5 ">
				<div className="col-2">
					<div className="d-flex justify-content-center">
						<img src={"./logos/cna.png"} alt="Logo cna" style={{ maxHeight: 70 }} />
					</div>
				</div>
				<div className="col-8 text-center">
					<h5>
						ORGANISMO DE CUENCA PENÍNSULA DE BAJA CALIFORNIA
						<br />
						DIRECCIÓN DE INFRAESTRUCTURA HIDROAGRÍCOLA
						<br />
						DISTRITO DE RIEGO 014, RÍO COLORADO, B.C. Y SONORA
						<br />
						JEFATURA DE OPERACIÓN
					</h5>
				</div>
				<div className="col-2">
					<div className="d-flex justify-content-center">
						<img
							src={"./logos/semarnat.png"}
							alt="Logo sanidad vegetal"
							style={{ maxHeight: 110 }}
						/>
					</div>
				</div>
			</div>

			<div className="row pt-5"></div>

			<div className="row d-flex justify-content-center">
				<h5>
					<b>AVISO DE TRANSFERENCIA DE VOLÚMENES Y DERECHOS DE RIEGO AÑO AGRÍCOLA {ciclo}</b>
				</h5>
			</div>

			<div className="row m-3 d-flex flex-column justify-content-center mt-5">
				<p clssName="paragraph">
					&nbsp;&nbsp;&nbsp;&nbsp; EN BASE A LO DISPUESTO EN EL ARTÍCULO 49 DE LA LEY DE AGUAS
					NACIONALES EN EL CUAL ESPECIFICA QUE LOS DERECHOS DE EXPLOTACIÓN, USO O APROVECHAMIENTO DE
					AGUA PARA USO AGRÍCOLA, GANADERO O FORESTAL SE PODRÁN TRANSMITIR EN LOS TÉRMINOS Y
					CONDICIONES ESTABLECIDAS EN LA LEY Y SU REGLAMENTO, Y EL ARTÍCULO 88 DEL REGLAMENTO DE LA
					PROPIA LEY, DICE QUE LA TRANSMISIÓN DE DERECHOS DE RIEGO A QUE SE REFIERE EL ARTÍCULO 49
					DE LA ‘LEY’ EN RELACIÓN CON EL CAPÍTULO V DEL TÍTULO CUARTO DE LA MISMA, ASÍ COMO LAS
					TRANSMISIONES EN UNIDADES Y DISTRITOS DE RIEGO PODRÁN SER TEMPORAL O DEFINITIVA.
				</p>

				<p clssName="paragraph">
					&nbsp;&nbsp;&nbsp;&nbsp; ES TEMPORAL CUANDO LOS DERECHOS SE TRANSFIEREN POR DETERMINADOS
					CICLOS AGRÍCOLAS CONSERVANDO LA TITULARIDAD DE LA CONCESIÓN SIEMPRE Y CUANDO NO SE CAUSEN
					PERJUICIOS A TERCEROS, POR LO ANTERIORMENTE SEÑALADO LA COMISIÓN NACIONAL DEL AGUA HA
					ACORDADO, QUE SE AUTORICE LA TRANSFERENCIA PROVISIONAL DE LOS DERECHOS DE RIEGO.
				</p>
			</div>
			<div className="row m-3 mt-5">
				<div className="col-6">
					<p>
						SOLICITANTE: <br />
						{apPaterno} {apMaterno} {nombre}
						<br />
						LOTE: {predio} en {tipoLocalidad} {nombreLocalidad}
						<br />
						{superficieTransferida} HECTÁREAS DE {nombreCultivo}
						<br />
					</p>
				</div>
				<div className="col-6">
					<p>
						ADJUDICATARIO:
						<br />
						{apPaternoSolicitante} {apMaternoSolicitante} {nombreSolicitante}
						<br />
						LOTE: {loteDestino} en {tipolocalidadDestino} {localidadDestino}
						<br />
					</p>
				</div>
			</div>

			<div className="row m-3 d-flex flex-column justify-content-center mt-5">
				<p clssName="paragraph">
					&nbsp;&nbsp;&nbsp;&nbsp; ESTA TRANSFERENCIA TENDRÁ VALIDEZ ÚNICAMENTE EN EL PRESENTE CICLO
					AGRÍCOLA {ciclo}, DEBIENDO ENTREGARSE EL SERVICIO DE RIEGO PRECISAMENTE AL SOLICITANTE.
				</p>
			</div>

			<div className="row m-3 justify-content-end mt-5">
				<p>MEXICALI, B. C. , A {fecha.toLocaleString("es-MX", dateOptions).toUpperCase()}</p>
			</div>

			<div className="row d-flex justify-content-center mt-5">
				<p className="text-center">
					ATENTAMENTE
					<br />
					EL ING. EN JEFE DEL DISTRITO DE
					<br />
					RIEGO 014, RIO COLORADO
					<br />
				</p>
			</div>

			<div className="row m-3 justify-content-center">
				<p className="text-center">DR. JULIO ALFONSO NAVARRO URBINA</p>
			</div>

			<div className="row m-3 mt-5">
				C.C.P. DISTRITO DE RIEGO NO. 014, RIO COLORADO. - EDIF. <br />
				C.C.P. JEFATURA DE OPERACIÓN. - EDIF. <br />
				C.C.P. DISTRITO DE RIEGO RIO COLORADO S.de R.L. de I.P. - PTE. <br />
				C.C.P. MÓDULOS DE RIEGO {zona} y {moduloDestino}. - PTE. <br />
				C.C.P. MINUTARIO <br />
				C.C.P. ARCHIVO <br />
			</div>

			<div className="row m-3 d-flex justify-content-center pt-5">
				<button
					type="button"
					className="btn btn-outline-primary ml-5 d-print-none"
					onClick={imprimir}
				>
					<i className="fas fa-print"></i>
					<span> Imprimir</span>
				</button>

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
