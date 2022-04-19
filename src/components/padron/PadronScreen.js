import React, { useEffect, useState } from "react";
import { CustomTable } from "../tables/CustomTable";
import { usuariosColumns } from "../tables/configTables";
import {
	startSetUsuarioSelected,
	unsetUsuarios,
	unsetUsuarioSelected
} from "../../actions/usuarios";
import { UsuarioInput } from "../permisos/inputsNuevosPermisos/UsuarioInput";
import { useDispatch, useSelector } from "react-redux";
import { UsuarioSelectedDetail } from "./UsuarioSelectedDetail";
import { UpdatePadronModule } from "../ui/organisms/UpdatePadronModule";
import { UpdateReacomodosModule } from "../ui/organisms/UpdateReacomodosModule";
import { DownloadPadronButton } from "../ui/atoms/DownloadPadronButton";
import { PrintConstancyModal } from "../modals/PrintConstancyModal";
import { ConstancyModule } from "../ui/organisms/ConstancyModule";
import { ProductoresModule } from "./ProductoresModule";
import { DictamenModal } from "../modals/DictamenModal";
import { PrintDictamenModal } from "../modals/PrintDictamenModal";

export const PadronScreen = () => {
	const { usuarios, usuario } = useSelector((state) => state.entidades);
	const { privilegios } = useSelector((state) => state.auth);
	const { padronScreen } = useSelector((state) => state.scenes);
	const { dictamen } = padronScreen;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(unsetUsuarioSelected());
		dispatch(unsetUsuarios());
	}, [dispatch]);

	let data = [];

	if (usuarios) {
		data = Object.values(usuarios);
	}

	const [global, setGlobal] = useState(false);
	const handleSetGlogal = () => {
		setGlobal(!global);
	};

	const [modalState, setModalState] = useState({
		openModal: false,
		constancySaved: false,
		constancia: {}
	});
	const { openModal, constancia, constancySaved } = modalState;

	const [dictamenFormState, setDictamenFormState] = useState({
		isOpenDictamenForm: false
	});
	const { isOpenDictamenForm } = dictamenFormState;

	const [isOpenDictamenPrint, setIsOpenDictamenPrint] = useState(true);

	return (
		<div className="mt-5">
			<h4>Consulta en padron de usuarios</h4>
			<div className="row mt-2 d-flex justify-content-start">
				<div className="col-sm-1 mt-3">
					{privilegios.accesoGlobal &&
						(global ? (
							<button onClick={handleSetGlogal} className="btn btn-primary mr-3">
								Global
							</button>
						) : (
							<button onClick={handleSetGlogal} className="btn btn-outline-primary mr-3">
								Global
							</button>
						))}
				</div>
				<UsuarioInput global={global} />

				<div className="col-sm-3">
					<DownloadPadronButton />
				</div>
			</div>

			{usuarios && (
				<div className="row">
					<div className="col-sm-8 mb-3">
						<CustomTable
							title={data.length === 0 ? "No se encontraron usuarios" : "Usuarios"}
							columns={usuariosColumns}
							data={data}
							setFunction={startSetUsuarioSelected}
						></CustomTable>
					</div>

					<div className="col-sm-4">
						{usuario && (
							<UsuarioSelectedDetail
								setModalState={setModalState}
								setDictamenFormState={setDictamenFormState}
							/>
						)}
					</div>
				</div>
			)}

			<div className="mt-5"></div>

			{privilegios.generarConstancias && (
				<ConstancyModule modalState={modalState} setModalState={setModalState} className="mt-5" />
			)}

			<div className="mt-5"></div>

			{privilegios.actualizarPadron && (
				<div className="border border-info rounded p-3 mt-3">
					<h3 className="row d-flex justify-content-center">
						Actualizar padron de usuarios y reacomodos
					</h3>
					<div className="row">
						<div className="col-sm-6 mt-3 mb-3">
							<UpdatePadronModule />
						</div>

						<div className="col-sm-6 mt-3 mb-3">
							<UpdateReacomodosModule />
						</div>
					</div>
				</div>
			)}

			{privilegios.editarProductores && (
				<div className="mt-4">
					<ProductoresModule />
				</div>
			)}

			{openModal && (
				<PrintConstancyModal
					openModal={openModal}
					constancia={constancia}
					constancySaved={constancySaved}
					setModalState={setModalState}
				/>
			)}

			{isOpenDictamenForm && (
				<DictamenModal
					isOpenModal={isOpenDictamenForm}
					setDictamenFormState={setDictamenFormState}
					setIsOpenDictamenPrint={setIsOpenDictamenPrint}
				/>
			)}

			{dictamen && (
				<PrintDictamenModal
					isOpenDictamenPrint={isOpenDictamenPrint}
					setDictamenFormState={setDictamenFormState}
					setIsOpenDictamenPrint={setIsOpenDictamenPrint}
				/>
			)}
			<br />
		</div>
	);
};
