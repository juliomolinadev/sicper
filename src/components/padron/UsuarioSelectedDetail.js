import React from "react";
import { useSelector } from "react-redux";
import { getConstancyCounter } from "../../helpers/DB/getConstancyCount";

export const UsuarioSelectedDetail = ({ setModalState, setDictamenFormState }) => {
	const { privilegios } = useSelector((state) => state.auth);
	const { generarConstancias, generarDictamenes } = privilegios;
	const altaPermisos = useSelector((state) => state.altaPermisos);
	const { usuarios, idUsuarioSelected } = useSelector((state) => state.altaPermisos);

	const startSaveConstancy = async () => {
		const usuario = usuarios.find((usuario) => usuario.id === idUsuarioSelected);
		const constancia = {
			...usuario,
			folio: await defineFolio(),
			fecha: new Date()
		};

		setModalState({ openModal: true, constancia });
	};

	const openDictamenModal = () => {
		setDictamenFormState({ isOpenDictamenForm: true });
	};

	return (
		<div className="border rounded mb-4 p-2">
			<div>Cuenta: {altaPermisos.cuenta}</div>
			<div>Usuario: {altaPermisos.usuario}</div>
			<div>
				{altaPermisos.tipoLocalidad}: {altaPermisos.nombreLocalidad}
			</div>
			<div>Lote: {altaPermisos.lote}</div>
			<div>Sección: {altaPermisos.seccion}</div>
			<div>Módulo: {altaPermisos.modulo}</div>
			<div>Sup. Derecho: {altaPermisos.supDerecho}</div>
			<div>Sup. Disponible: {altaPermisos.supDerecho - altaPermisos.supPrevia}</div>
			<div>Sistema: {altaPermisos.sistema}</div>
			{altaPermisos.reacomodo && (
				<div className="text-info">Reacomodo: {altaPermisos.reacomodo}</div>
			)}

			{generarConstancias && (
				<div className="d-flex justify-content-center">
					<button className="btn btn-outline-primary m-4" onClick={startSaveConstancy}>
						Generar constancia
					</button>
				</div>
			)}

			{generarDictamenes && !altaPermisos.dictamen && (
				<div className="d-flex justify-content-center">
					<button className="btn btn-outline-primary m-4" onClick={openDictamenModal}>
						Generar Dictamen
					</button>
				</div>
			)}
		</div>
	);
};

const fill = (number, len) => "0".repeat(len - number.toString().length) + number.toString();

const defineFolio = async () => {
	const date = new Date();
	const anio = date.getFullYear();

	const counter = await getConstancyCounter(anio);
	if (counter !== false) {
		const folio = `${fill(counter + 1, 3)}-${anio}`;
		return folio;
	} else return null;
};
