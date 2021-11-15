import React from "react";
import { useDispatch } from "react-redux";
import { enablePrintButton, openTransferModal } from "../../actions/transferenciasScreen";

export const TransferCard = ({ transferencia }) => {
	const dispatch = useDispatch();
	const {
		folio,
		cuenta,
		subcta,
		nombreLocalidad,
		supRiego,
		predio,
		supPrevia,
		apPaterno,
		apMaterno,
		nombre,
		apPaternoSolicitante,
		apMaternoSolicitante,
		nombreSolicitante,
		zona,
		tipoLocalidad,
		moduloDestino,
		tipolocalidadDestino,
		localidadDestino,
		loteDestino,
		claveCultivo,
		nombreCultivo,
		superficieTransferida,
		estadoTransferencia
	} = transferencia;

	const derechoDisponible = supRiego - supPrevia;
	const nombreUsuario = `${apPaterno} ${apMaterno} ${nombre}`;
	const nombreAdjudicatario = `${apPaternoSolicitante} ${apMaternoSolicitante} ${nombreSolicitante}`;

	const openPrintModal = () => {
		dispatch(openTransferModal());
		dispatch(enablePrintButton());
	};

	return (
		<div className="border border-info rounded">
			<div className="border-bottom border-info p-2">
				<div className="d-flex justify-content-center">
					<h3>Folio: {folio}</h3>
				</div>
			</div>

			<div className="d-flex flex-column border-bottom border-info p-4">
				<div>SOLICITANTE</div>
				<div>Nombre: {nombreUsuario}</div>
				<div>Cuenta: {`${cuenta}.${subcta}`}</div>
				<div>
					{tipoLocalidad}: {nombreLocalidad}
				</div>
				<div>Lote: {predio}</div>
				<div>Modulo Origen: {zona}</div>
				<div>Sup. Derecho: {supRiego} ha</div>
				<div>Sup. Disponible: {derechoDisponible} ha</div>
			</div>

			<div className="d-flex flex-column border-bottom border-info p-4">
				<div>ADJUDICATARIO</div>
				<div>Nombre: {nombreAdjudicatario}</div>
				<div>Modulo Destino: {moduloDestino}</div>
				<div>
					{tipolocalidadDestino}: {localidadDestino}
				</div>
				<div>Lote: {loteDestino}</div>
				<div>Cultivo: {`${claveCultivo} - ${nombreCultivo}`}</div>
				<div>Sup. Trasferida: {superficieTransferida} ha</div>
			</div>

			<div className="d-flex flex-column border-bottom border-info p-4">
				<div>ESTADO: {estadoTransferencia}</div>

				<button type="button" className="btn btn-outline-primary mt-4" onClick={openPrintModal}>
					<i className="fas fa-print"></i>
					<span> Imprimir</span>
				</button>

				<button type="button" className="btn btn-outline-success mt-4" onClick={openPrintModal}>
					<i className="fas fa-check"></i>
					<span> Autorizar</span>
				</button>

				<button type="button" className="btn btn-outline-danger mt-4" onClick={openPrintModal}>
					<i className="fas fa-times"></i>
					<span> Cancelar</span>
				</button>
			</div>
		</div>
	);
};
