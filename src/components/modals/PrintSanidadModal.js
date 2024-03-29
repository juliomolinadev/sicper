import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";

import { closeSanidadModal } from "../../actions/algodoneroScreen";

export const PrintSanidadModal = ({ data }) => {
	const { printSanidadModal } = useSelector((state) => state.algodoneroScreen);

	const dispatch = useDispatch();

	const closeModal = () => {
		dispatch(closeSanidadModal());
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
			isOpen={printSanidadModal}
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
					<div className="d-flex justify-content-center">
						<img src={"./logos/cesvbc.webp"} alt="Logo sanidad vegetal" style={{ maxHeight: 80 }} />
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
					<b>ALGODONERO CICLO P-V {data.ciclo}</b>
				</h5>
			</div>

			<div className="row pt-5"></div>

			<div className="row d-flex justify-content-center pt-5 text-justify">
				<div className="col-8">
					<p>
						POR LA PRESENTE HACEMOS CONSTAR QUE EL C. {data.nombreProductor}, PRODUCTOR DEL LOTE NO.
						{data.lote} DEL EJIDO/COLONIA {data.localidad}, CON SUPERFICIE SEMBRADA DE:
						{data.supAutorizada} HA; REALIZÓ LAS LABORES FITOSANITARIAS EN UNA SUPERFICIE DESVARADA
						DE: {data.supAutorizada} HA; SUPERFICIE DISQUEADA DE: {data.supAutorizada} HA;
						SUPERFICIE BARBECHADA DE: {data.supAutorizada} HA; SUPERFICIE CON DESARRAIGO TOTAL DE:
						{data.supAutorizada} HA.
					</p>

					<p>
						DANDO ASÍ CUMPLIMIENTO A LO ESTABLECIDO EN LA LEY FEDERAL DE SANIDAD VEGETAL, LA NORMA
						OFICIAL MEXICANA: NOM-026-SAG/FITO-2014 POR LA QUE SE ESTABLECE EL CONTROL DE PLAGAS
						REGLAMENTADAS DEL ALGODONERO Y LA NOM-081-FITO-2001-MANEJO Y ELIMINACIÓN DE FOCOS DE
						INFESTACIÓN DE PLAGAS, MEDIANTE EL ESTABLECIMIENTO O REORDENAMIENTO DE FECHAS DE
						SIEMBRA, COSECHA Y DESTRUCCIÓN DE RESIDUOS.
					</p>

					<p>SIRVA EL PRESENTE DOCUMENTO PARA LA LIBERACIÓN DE CARTA DE GARANTÍA EMITIDA.</p>

					<p>PROPIETARIO: {data.usuario}</p>

					<div className=" d-flex justify-content-end pt-5">
						<p>MEXICALI, B.C., dia DE mes De anio</p>
					</div>
				</div>
			</div>

			<div className="row pt-5"></div>
			<div className="row pt-5"></div>
			<div className="row pt-5"></div>

			<div className="row pt-5 d-flex ">
				<div className="col-4 d-flex flex-column ">
					<p className="pb-5 text-center">NOMBRE Y FIRMA</p>
					<hr />
					<div className="text-center">
						<b>TÉCNICO FITOSANITARIO DEL CESVBC</b>
					</div>
				</div>

				<div className="col-4 d-flex align-items-end justify-content-center">
					<div className="text-center">
						<b>SELLO DE CESVBC</b>
					</div>
				</div>

				<div className="col-4 d-flex align-items-end justify-content-center">
					<div className="text-center">
						<b>SELLO DE CADER</b>
					</div>
				</div>
			</div>

			<div className="row p-5">
				C.c.p. -DISTRITO DE DESARROLLO RURAL 002-RIO COLORADO <br />
				C.c.p. -ARCHIVO
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
