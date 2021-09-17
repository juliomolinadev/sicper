import React from "react";
import Modal from "react-modal";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import {
	closePrintPermisoModal,
	startDisableSaveButton,
	unsetOnSubmitData,
	startEnablePrintButton,
	setEnEspera,
	unsetEnEspera,
	startEnableSaveButton,
	startDisablePrintButton
} from "../../actions/altaPermisos";
import { unsetCultivoSelected } from "../../actions/cultivos";
import { unsetProductorSelected } from "../../actions/productores";
import { unsetUsuarioSelected } from "../../actions/usuarios";
import { savePermiso } from "../../helpers/savePermiso";

const customStyles = {
	content: {
		width: "1125px",
		height: "1500px",
		overflow: "auto"
	}
};

export const PrintPermisoModal = ({ data, isNew }) => {
	const { openPrintPermisoModal, enableSaveButton, enablePrintButton, enEspera } = useSelector(
		(state) => state.altaPermisos
	);
	const dispatch = useDispatch();

	const closeModal = () => {
		dispatch(closePrintPermisoModal());
		dispatch(unsetOnSubmitData());
		dispatch(unsetCultivoSelected());
		dispatch(unsetProductorSelected());
		dispatch(unsetUsuarioSelected());
		dispatch(startEnableSaveButton());
		dispatch(startDisablePrintButton());
	};

	const handleSavePermiso = async () => {
		dispatch(startDisableSaveButton());
		dispatch(setEnEspera());
		if (await savePermiso(data)) {
			dispatch(unsetEnEspera());
			dispatch(startEnablePrintButton());
		}
	};

	const imprimir = () => {
		window.print();
	};

	return (
		<Modal
			isOpen={openPrintPermisoModal}
			onRequestClose={closeModal}
			style={customStyles}
			closeTimeoutMS={200}
			className="printModal"
			overlayClassName="modal-fondo"
		>
			{/* Marca de agua ***************************************************************** */}

			{data.estadoPermiso === "activo" ? (
				<></>
			) : (
				<div className="watermark rotar">{data.estadoPermiso}</div>
			)}

			{/* Header ************************************************************************ */}

			<div className="row m-3 d-flex justify-content-center">
				<div className="col-2 d-flex flex-column justify-content-center">
					<div className="d-flex justify-content-center">
						<img src={"./logos/sader.png"} alt="Logo SADER" style={{ maxHeight: 35 }} />
					</div>
					<div className="d-flex justify-content-center mt-3">
						<img src={"./logos/srl.png"} alt="Logo CRL" style={{ maxHeight: 70 }} />
					</div>
					<div className="d-flex justify-content-center">
						<span className="printPermisoSubLogo">DISTRITO DE RIEGO RÍO COLORADO</span>
					</div>
					<div className="d-flex justify-content-center">
						<span className="printPermisoSubLogo">S DE R.L. DE I.P. DE C.V.</span>
					</div>
					<div className="border rounded d-flex justify-content-left mt-4 w-200">Folio: </div>
				</div>

				<div className="col-8 d-flex flex-column justify-content-center">
					<h1 className="d-flex justify-content-center">
						<b>PERMISO ÚNICO DE SIEMBRA</b>
					</h1>
					<h3 className="d-flex justify-content-center">
						<b>DISTRITO DE RIEGO 014 RÍO COLORADO</b>
					</h3>
					<h2 className="d-flex justify-content-center pt-4">
						{" "}
						<b>Ciclo Agrícola {data.ciclo}</b>{" "}
					</h2>
				</div>

				<div className="col-2 d-flex flex-column justify-content-center">
					<div className="d-flex justify-content-center">
						<img
							src={"./logos/cna.png"}
							alt="Logo comisión nacional del agua"
							style={{ maxHeight: 50 }}
						/>
					</div>
					<div className="border rounded d-flex justify-content-center mt-4">
						Folio: {data.numeroPermiso}
					</div>
					<div className="d-flex justify-content-center mt-4">
						{moment(data.fechaEmicion).format("DD/MM/YYYY")}
					</div>
				</div>
			</div>

			{/* Datos del usuario ******************************************************************* */}

			<div className="row m-3 d-flex flex-column justify-content-center border rounded">
				<div className="d-flex justify-content-center ">DATOS DEL USUARIO</div>

				<div className="d-flex justify-content-center border-top p-1">
					<p>
						El/la C.<b> {data.usuario}</b> con cuenta: <b>{data.cuenta}</b> tiene un derecho normal
						de <b>{data.supDerecho} </b>
						hectáreas del lote: <b>{data.lote}</b> en la colonia/ejido <b>{data.localidad}</b>,{" "}
						<b>{data.municipio}</b>, <b>{data.estado}</b>. Módulo <b>{data.modulo}</b>, sección{" "}
						<b>{data.seccion}</b> del canal <b>{data.canal}</b> toma <b>{data.toma}</b> con sistema
						de riego por <b>{data.sistema}</b>.
					</p>
				</div>
			</div>

			{/* Parrafo legal ********************************************************************** */}

			<div className="row m-3 d-flex flex-column justify-content-center">
				<p>
					Con base en el Acuerdo Nacional de Colaboración entre la Secretaría de Agricultura,
					Ganadería, Desarrollo Rural, Pesca y Alimentación y el Acuerdo de Concertación entre la
					SAGARPA, CONAGUA, Distrito de Riego Río Colorado y la Sociedad de Responsabilidad Limitada
					con el objetivo de regular en forma ordenada la expedición de Permisos Únicos de Siembra
					con Derechos de Agua, y con fundamento en los artículos 66, 67, 68, 69 y 69 Bis de la Ley
					de Aguas Nacionales; Reglamento de la Ley de Sanidad Fitopecuaria de los Estados Unidos
					Mexicanos, en materia de sanidad vegetal, Normas Mexicanas, NOM-026-FITO-1995, que
					establece el control de plagas de algodonero, NOM-001-FITO-2001, para el manejo y
					eliminación de focos de infección de plagas, mediante el reordenamiento de fechas de
					siembra y destrucción de residuos. Se otorga el Permiso Único de Siembra para que
					establezca exclusivamente el cultivo y superficie que se indica, apercibiendose que se
					puede suspender el servicio de riego si se siembra superficie adicional o cultivo
					diferente al autorizado en este permiso.
				</p>
			</div>

			{/* Detalle de cultivo y superficie ***************************************************** */}

			<div className="row m-3 d-flex">
				<div className="col-4 d-flex flex-column border rounded p-0">
					<div className="d-flex justify-content-center ">DETALLES DEL CULTIVO</div>
					<div className="border-top p-1">
						Tipo de permiso: <b>{data.tipo}</b>
						<br />
						Cultivo:{" "}
						<b>
							{data.nombreCultivo} (Clave: {data.claveCultivo})
						</b>
						<br />
						Subciclo: <b>{data.subciclo}</b>
						<br />
						Superficie autorizada: <b>{data.supAutorizada} ha</b>
						<br />
						Fecha límite de siembra: <b>{moment(data.fechaLimite).format("DD/MM/YYYY")}</b>
						<br />
					</div>
				</div>

				<div className="col-1"></div>

				<div className="col-7 d-flex flex-column border rounded">
					<div className="d-flex justify-content-center ">SUPERFICIE Y DOTACIÓN VOLUMÉTRICA</div>
					<div className="row border-top d-flex text-dotacion">
						<div className="col-3 border">
							<div>Descripción</div>
						</div>
						<div className="col-2 border">
							<div>Derecho de riego</div>
						</div>
						<div className="col-2 border">
							<div>Utilizada Previamente</div>
						</div>
						<div className="col-3 border">
							<div>Autorizada en este permiso</div>
						</div>
						<div className="col-2 border">
							<div>Disponible</div>
						</div>
					</div>

					<div className="row border-top d-flex text-dotacion">
						<div className="col-3 border">
							<div>Hectáreas</div>
						</div>
						<div className="col-2 border">
							<div>{data.supDerecho}</div>
						</div>
						<div className="col-2 border">
							<div>{data.supPrevia}</div>
						</div>
						<div className="col-3 border">
							<div>{data.supAutorizada}</div>
						</div>
						<div className="col-2 border">
							<div>{data.supDerecho - data.supPrevia - data.supAutorizada}</div>
						</div>
					</div>

					<div className="row border-top d-flex text-dotacion">
						<div className="col-3 border">
							<div>l.p.s./24 hrs/hr Parcela</div>
						</div>
						<div className="col-2 border">
							<div>{data.supDerecho * data.dotacion}</div>
						</div>
						<div className="col-2 border">
							<div>{data.supPrevia * data.dotacion}</div>
						</div>
						<div className="col-3 border">
							<div>{data.supAutorizada * data.dotacion}</div>
						</div>
						<div className="col-2 border">
							<div>{(data.supDerecho - data.supPrevia - data.supAutorizada) * data.dotacion}</div>
						</div>
					</div>
				</div>
			</div>

			{/* Datos complementarios  ************************************************************* */}

			<div className="row m-3 d-flex">
				<div className="col-4 d-flex flex-column border rounded p-0">
					<div className="d-flex justify-content-center ">DATOS COMPLEMENTARIOS</div>
					<div className="border-top p-1">
						Cultivo Anterior: <b>{data.cultivoAnterior}</b>
						<br />
						Fuente de crédito: <b>{data.fuenteCredito}</b>
						<br />
						Variedad: <b>{data.variedad}</b>
						<br />
						Productor:{" "}
						<b>
							{data.nombreProductor} ({data.rfcProductor})
						</b>
						<br />
					</div>
				</div>

				<div className="col-1"></div>

				<div className="col-7 d-flex flex-column border rounded">
					<div className="d-flex justify-content-center ">OBSERVACIONES</div>
					<div className="row border-top d-flex text-dotacion p-1">
						<p>{data.observaciones}</p>
					</div>
				</div>
			</div>

			{/* Transferencia  ************************************************************* */}

			<div className="row m-3 d-flex flex-column justify-content-center border rounded">
				<div className="d-flex justify-content-center ">TRANSFERENCIA</div>

				<div className="d-flex border-top p-1">{data.transferencia}</div>
			</div>

			{/* Firmas  ************************************************************* */}

			<div className="row m-3 ">
				<div className="col-4 d-flex flex-column">
					<div className="border-top firma d-flex justify-content-center">Módulo</div>
					<div className="d-flex justify-content-center">
						<b>{data.titular}</b>
					</div>
					<div className="d-flex justify-content-center">PRESIDENTE</div>
				</div>
				<div className="col-4 d-flex flex-column">
					<div className="border-top firma d-flex justify-content-center">Sanidad Vegetal</div>
				</div>
				<div className="col-4 d-flex flex-column">
					<div className="border-top firma d-flex justify-content-center">FIRMA DEL PRODUCTOR</div>
					<div className="d-flex justify-content-center">
						<b>{data.usuario}</b>
					</div>
					<div className="d-flex justify-content-center">Acepto de conformidad</div>
				</div>
			</div>

			{/* Advertencias  ************************************************************* */}

			<div className="row m-3">
				<p>
					<b>
						<br />
						<u>
							ADVERTENCIAS: (1) Es responsabilidad del usuario de este permiso, disponer de la
							totalidad del volumen adicional requerido por el cultivo a establecer. (2) Para los
							sistemas de Gravedad y Pozo Federal un derecho de riego de 20 ha. alcanza para regar
							una superficie sembrada para el cultivo de Trigo = 20ha., Algodón = 15ha., Alfalfa
							13ha., Esparrago = 16ha., y Sorgo forrajero temprano = 18ha.
						</u>
					</b>
				</p>
			</div>

			{/* Encavezado sanidad  ************************************************************* */}

			<div className="row m-3 d-flex justify-content-between border-top">
				<div className="border rounded mt-2 p-2">Folio: {data.numeroPermiso}</div>
				<div className="border rounded mt-2 p-2">
					Bueno por: $ {data.cuotaCultivo * data.supAutorizada} pesos M.N.
				</div>
			</div>

			{/* Resivo Sanidad  ************************************************************* */}

			<div className="roe m-3">
				<u>
					Recibimos de El/la C.{" "}
					<b>
						{data.usuario} La cantidad de {data.cuotaCultivo * data.supAutorizada} pesos M.N.
					</b>{" "}
					Por concepto de aportación a las campañas Fitosanitarias, para el sostenimiento del comité
					Estatal de Sanidad Vegetal.
				</u>
			</div>

			{/* Datos usuario sanidad  ************************************************************* */}

			<div className="row m-3 d-flex flex-column justify-content-center border rounded">
				<div className="d-flex justify-content-center ">DATOS DEL USUARIO</div>

				<div className="d-flex justify-content-center border-top p-1">
					<p>
						El/la C.<b> {data.usuario}</b> con cuenta: <b>{data.cuenta}</b> tiene un derecho normal
						de <b>{data.supDerecho} </b>
						hectáreas del lote: <b>{data.lote}</b> en la colonia <b>{data.localidad}</b>,{" "}
						<b>{data.municipio}</b>, <b>{data.estado}</b>. Módulo <b>{data.modulo}</b>, sección{" "}
						<b>{data.seccion}</b> del canal <b>{data.canal}</b> toma <b>{data.toma}</b> con sistema
						de riego por <b>{data.sistema}</b>.
					</p>
				</div>
			</div>

			{/* Logo sanidad  y botones************************************************************* */}

			<div className="row m-3 ">
				<div className="col-3 d-flex flex-column">
					<div className="d-flex justify-content-center">
						<img src={"./logos/cesvbc.webp"} alt="Logo sanidad vegetal" style={{ maxHeight: 70 }} />
					</div>
					<div className="mt-4 d-flex justify-content-center">COMITÉ ESTATAL DE</div>
					<div className="d-flex justify-content-center">SANIDAD VEGETAL DE</div>
					<div className="d-flex justify-content-center">BAJA CALIFORNIA</div>
				</div>
				<div className="col-6 d-flex justify-content-center align-items-center pt-5">
					{enableSaveButton ? (
						isNew ? (
							<button
								type="submit"
								className="btn btn-outline-primary ml-5 d-print-none"
								onClick={handleSavePermiso}
							>
								<i className="far fa-save"></i>
								<span> Guardar</span>
							</button>
						) : (
							<button
								type="button"
								className="btn btn-outline-primary ml-5 d-print-none"
								onClick={imprimir}
							>
								<i className="fas fa-print"></i>
								<span> Imprimir</span>
							</button>
						)
					) : (
						<></>
					)}

					{enEspera ? (
						<div className="spinner-border text-primary" role="status">
							<span className="sr-only">Loading...</span>
						</div>
					) : (
						<></>
					)}

					{enablePrintButton ? (
						<button
							type="button"
							className="btn btn-outline-primary ml-5 d-print-none"
							onClick={imprimir}
						>
							<i className="fas fa-print"></i>
							<span> Imprimir</span>
						</button>
					) : (
						<></>
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
			</div>
		</Modal>
	);
};
