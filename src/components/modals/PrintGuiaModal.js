import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";

import { closeGuiaPrint, startSaveGuia } from "../../actions/permisosScreen";

export const PrintGuiaModal = () => {
	const { isGuiaPrintModalOpen, guia } = useSelector((state) => state.permisosScreen);
	const { variablesGlobales } = useSelector((state) => state.auth);
	const { cicloActual } = variablesGlobales;

	const dateOptions = { year: "numeric", month: "long", day: "numeric" };
	const formatter = new Intl.NumberFormat("es-MX", {
		style: "currency",
		currency: "MXN"
	});

	const customStyles = {
		content: {
			padding: "0 50px",
			width: "1125px",
			height: "1500px",
			overflow: "auto"
		}
	};

	const closeModal = () => {
		dispatch(closeGuiaPrint());
	};

	const imprimir = () => {
		window.print();
	};

	const dispatch = useDispatch();

	const handleSaveGuia = () => {
		console.log("Guardando...");
		dispatch(startSaveGuia(cicloActual, guia));
	};

	return (
		<Modal
			isOpen={isGuiaPrintModalOpen}
			onRequestClose={closeModal}
			style={customStyles}
			closeTimeoutMS={200}
			className="printModalSanidad"
			overlayClassName="modal-fondo"
		>
			<div className="row pr-5 pl-5 pt-5">
				<div className="col-2">
					<h4 className="font-weight-bold text-danger text-center">
						<b>CENTRO RECEPTOR </b>
					</h4>

					<div className="d-flex justify-content-center mt-3">
						<img src={"./logos/sader.png"} alt="Logo sader" style={{ maxHeight: 50 }} />
					</div>
				</div>

				<div className="col-7 text-center">
					<h4 className="font-weight-bold">REPRESENTACIÓN ESTATAL EN BAJA CALIFORNIA</h4>
					<h5 className="font-weight-bold mt-4">
						COMITÉ ESTATAL DE SANIDAD VEGETAL DE BAJA CALIFORNIA
					</h5>
					<div className="font-weight-bold">
						APOYO PARA LA REALIZACIÓN DE LA CAMPAÑA VIGILANCIA EPIDEMIOLÓGICA FITOSANITARIA
					</div>
				</div>

				<div className="col-3">
					<div className="d-flex-column justify-content-center">
						<h5 className="font-weight-bold text-danger">FOLIO: {guia.folio}</h5>

						<img
							src={"./logos/cesvbc.webp"}
							alt="Logo sanidad vegetal"
							style={{ maxHeight: 110 }}
							className="mt-3"
						/>

						<div
							className="bg-secondary font-weight-bold text-light text-center"
							style={{ fontSize: 10 }}
						>
							CERTIFICADO DE ORIGEN
						</div>
					</div>
				</div>
			</div>

			<div className="row mb-3">
				<div className="col-12 font-weight-bold">DATOS DEL PRODUCTOR:</div>
			</div>

			<div className="border rounded p-2 mb-2">
				<div className="row">
					<div className="col-4 d-flex">
						<div className="font-weight-bold mr-2">NOMBRE:</div>
						{guia.nombre}
					</div>
					<div className="col-2 d-flex">
						<div className="font-weight-bold mr-2">CUENTA CNA:</div>
						{guia.cuenta}
					</div>
					<div className="col-4 d-flex">
						<div className="font-weight-bold mr-2">UBICACIÓN:</div>
						{guia.tipoLocalidad} {guia.localidad}
					</div>
					<div className="col-2 d-flex">
						<div className="font-weight-bold mr-2">NO. PREDIO:</div>
						{guia.lote}
					</div>
				</div>
				<div className="row">
					<div className="col-4 d-flex">
						<div className="font-weight-bold mr-2">PRODUCTOR:</div>
						{guia.productor}
					</div>
					<div className="col-2 d-flex">
						<div className="font-weight-bold mr-2">HAS:</div>
						{guia.superficie}
					</div>
					<div className="col-4 d-flex">
						<div className="font-weight-bold mr-2">FECHA:</div>
						{guia.fecha.toLocaleString("es-MX", dateOptions).toUpperCase()}
					</div>
				</div>
			</div>

			<div className="row">
				<div className="col-12 d-flex">
					<div className="font-weight-bold mr-2">DESTINO COSECHA / RAZÓN SOCIAL DE LA EMPRESA:</div>
					{guia.empresaDestino}
				</div>
			</div>

			<div className="row">
				<div className="col-12 d-flex">
					<div className="font-weight-bold mr-2">UBICACIÓN :</div>
					{guia.ubicacionDestino}
				</div>
			</div>

			<div className="row">
				<div className="col-4 d-flex">
					<div className="font-weight-bold mr-2">CÁLCULO DE COSECHA :</div>
					{guia.superficie * guia.rendimiento} TON
				</div>

				<div className="col-4 d-flex">
					<div className="font-weight-bold mr-2">COSTO :</div>
					{formatter.format(guia.costo)} MN / TON
				</div>

				<div className="col-4 d-flex">
					<div className="font-weight-bold mr-2">COSTO TOTAL :</div>
					{formatter.format(guia.costo * (guia.superficie * guia.rendimiento))} MN
				</div>
			</div>

			<div className="row">
				<div className="col-4 d-flex">
					<div className="font-weight-bold mr-2">SUPERFICIE COSECHABLE :</div>
					{guia.superficie} HA
				</div>

				<div className="col-4 d-flex">
					<div className="font-weight-bold mr-2">RENDIMIENTO :</div>
					{guia.rendimiento} TON/HA
				</div>

				<div className="col-4 d-flex">
					<div className="font-weight-bold mr-2">PRODUCCIÓN TOTAL :</div>
					{guia.superficie * guia.rendimiento} TON
				</div>
			</div>

			<div className="row pt-5"></div>

			<div className="row">
				<div className="col-12 font-weight-bold">
					PARA LA RECEPCIÓN DEL TRIGO GRANO AL CENTRO DE ACOPIO, DEBERÁ SER AMPARADO CON LA PRESENTE
					GUÍA FITOSANITARIA
				</div>
			</div>

			<div className="row pt-5"></div>

			<div className="row">
				<div className="col-12 font-weight-bold">TRASLADO:</div>
			</div>

			<div className="row">
				<div className="col-2 d-flex">
					<div className="font-weight-bold"> No TOLVAS:</div>
					{guia.TrasladoNoTolvas}
				</div>

				<div className="col-2 d-flex">
					<div className="font-weight-bold">No TON:</div>
					{guia.TrasladoNoToneladas}
				</div>

				<div className="col-2 d-flex">
					<div className="font-weight-bold">No MODULO(S):</div>
					{guia.TrasladoNoModulos}
				</div>

				<div className="col-3 d-flex">
					<div className="font-weight-bold">TON:</div>
					{guia.TrasladoToneladas}
				</div>

				<div className="col-3 d-flex">
					<div className="font-weight-bold">TON.TOTALES:</div>
					{guia.TrasladoTonTotales}
				</div>
			</div>

			<div className="row mt-3">
				<div className="col-12 font-weight-bold">RECIBIDO EN CENTRO DE ACOPIO:</div>
			</div>

			<div className="row">
				<div className="col-2 d-flex">
					<div className="font-weight-bold"> No TOLVAS:</div>
					{guia.RecibidoNoTolvas}
				</div>

				<div className="col-2 d-flex">
					<div className="font-weight-bold">No TON:</div>
					{guia.RecibidoNoToneladas}
				</div>

				<div className="col-2 d-flex">
					<div className="font-weight-bold">No MODULO(S):</div>
					{guia.RecibidoNoModulos}
				</div>

				<div className="col-3 d-flex">
					<div className="font-weight-bold">TON:</div>
					{guia.RecibidoToneladas}
				</div>

				<div className="col-3 d-flex">
					<div className="font-weight-bold">TON.TOTALES:</div>
					{guia.RecibidoTonTotales}
				</div>
			</div>

			<div className="row pt-5"></div>
			<div className="row pt-5"></div>
			<div className="row pt-5"></div>
			<div className="row pt-5"></div>
			<div className="row pt-5"></div>
			<div className="row pt-5"></div>

			<div className="row border-top pr-5 pl-5 pt-5">
				<div className="col-2">
					<h4 className="font-weight-bold text-danger text-center">
						<b>CENTRO RECEPTOR </b>
					</h4>

					<div className="d-flex justify-content-center mt-3">
						<img src={"./logos/sader.png"} alt="Logo sader" style={{ maxHeight: 60 }} />
					</div>
				</div>

				<div className="col-7 text-center">
					<h4 className="font-weight-bold">REPRESENTACIÓN ESTATAL EN BAJA CALIFORNIA</h4>
					<h5 className="font-weight-bold mt-4">
						COMITÉ ESTATAL DE SANIDAD VEGETAL DE BAJA CALIFORNIA
					</h5>
					<div className="font-weight-bold">
						APOYO PARA LA REALIZACIÓN DE LA CAMPAÑA VIGILANCIA EPIDEMIOLÓGICA FITOSANITARIA
					</div>
				</div>

				<div className="col-3">
					<div className="d-flex-column justify-content-center">
						<h5 className="font-weight-bold text-danger">FOLIO: {guia.folio}</h5>

						<img
							src={"./logos/cesvbc.webp"}
							alt="Logo sanidad vegetal"
							style={{ maxHeight: 110 }}
							className="mt-3"
						/>

						<div
							className="bg-secondary font-weight-bold text-light text-center"
							style={{ fontSize: 10 }}
						>
							CERTIFICADO DE ORIGEN
						</div>
					</div>
				</div>
			</div>

			<div className="row mb-3">
				<div className="col-12 font-weight-bold">DATOS DEL PRODUCTOR:</div>
			</div>

			<div className="border rounded p-2 mb-2">
				<div className="row">
					<div className="col-4 d-flex">
						<div className="font-weight-bold mr-2">NOMBRE:</div>
						{guia.nombre}
					</div>
					<div className="col-2 d-flex">
						<div className="font-weight-bold mr-2">CUENTA CNA:</div>
						{guia.cuenta}
					</div>
					<div className="col-4 d-flex">
						<div className="font-weight-bold mr-2">UBICACIÓN:</div>
						{guia.tipoLocalidad} {guia.localidad}
					</div>
					<div className="col-2 d-flex">
						<div className="font-weight-bold mr-2">NO. PREDIO:</div>
						{guia.lote}
					</div>
				</div>
				<div className="row">
					<div className="col-4 d-flex">
						<div className="font-weight-bold mr-2">PRODUCTOR:</div>
						{guia.productor}
					</div>
					<div className="col-2 d-flex">
						<div className="font-weight-bold mr-2">HAS:</div>
						{guia.superficie}
					</div>
					<div className="col-4 d-flex">
						<div className="font-weight-bold mr-2">FECHA:</div>
						{guia.fecha.toLocaleString("es-MX", dateOptions).toUpperCase()}
					</div>
				</div>
			</div>

			<div className="row">
				<div className="col-12 d-flex">
					<div className="font-weight-bold mr-2">DESTINO COSECHA / RAZÓN SOCIAL DE LA EMPRESA:</div>
					{guia.empresaDestino}
				</div>
			</div>

			<div className="row">
				<div className="col-12 d-flex">
					<div className="font-weight-bold mr-2">UBICACIÓN :</div>
					{guia.ubicacionDestino}
				</div>
			</div>

			<div className="row">
				<div className="col-4 d-flex">
					<div className="font-weight-bold mr-2">CÁLCULO DE COSECHA :</div>
					{guia.superficie * guia.rendimiento} TON
				</div>

				<div className="col-4 d-flex">
					<div className="font-weight-bold mr-2">COSTO :</div>
					{formatter.format(guia.costo)} MN / TON
				</div>

				<div className="col-4 d-flex">
					<div className="font-weight-bold mr-2">COSTO TOTAL :</div>
					{formatter.format(guia.costo * (guia.superficie * guia.rendimiento))} MN
				</div>
			</div>

			<div className="row">
				<div className="col-4 d-flex">
					<div className="font-weight-bold mr-2">SUPERFICIE COSECHABLE :</div>
					{guia.superficie} HA
				</div>

				<div className="col-4 d-flex">
					<div className="font-weight-bold mr-2">RENDIMIENTO :</div>
					{guia.rendimiento} TON/HA
				</div>

				<div className="col-4 d-flex">
					<div className="font-weight-bold mr-2">PRODUCCIÓN TOTAL :</div>
					{guia.superficie * guia.rendimiento} TON
				</div>
			</div>

			<div className="row m-3 d-flex justify-content-center pt-5">
				{guia.guardado ? (
					<button type="button" className="btn btn-outline-primary d-print-none" onClick={imprimir}>
						<i className="fas fa-print"></i>
						<span> Imprimir</span>
					</button>
				) : (
					<button
						type="button"
						className="btn btn-outline-primary ml-5 d-print-none"
						onClick={handleSaveGuia}
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
