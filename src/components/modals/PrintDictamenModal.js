import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { setDictamenDataSaved } from "../../actions/usuarios";
import { saveDictamen } from "../../helpers/saveDictamen";

export const PrintDictamenModal = ({
	isOpenDictamenPrint,
	setIsOpenDictamenPrint,
	setDictamenFormState
}) => {
	const { padronScreen } = useSelector((state) => state.scenes);
	const { dictamen } = padronScreen;
	const { usuario } = useSelector((state) => state.entidades);
	const { privilegios } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const closeModal = () => {
		setIsOpenDictamenPrint(false);
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

	const handleSaveDictamen = async () => {
		const isSave = saveDictamen(`${usuario.cuenta}.${usuario.subcta}`, "2022-2023", {
			...dictamen,
			estado: "activo"
		});

		if (isSave) {
			dispatch(setDictamenDataSaved({ ...dictamen, estado: "activo" }));
			setDictamenFormState({ isOpenDictamenForm: false });
		}
	};

	const dateOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
	const fecha = new Date();

	return (
		<Modal
			isOpen={isOpenDictamenPrint}
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
			<div className="row pl-5 pr-5 m-2">NOMBRE DEL PRODUCTOR: {dictamen.nombreProductor}</div>
			<div className="row pl-5 pr-5 m-2">
				NOMBRE DEL PROPIETARIO: {`${usuario.apPaterno} ${usuario.apMaterno} ${usuario.nombre}`}
			</div>
			<div className="row pl-5 pr-5 mt-2 mb-2">
				<div className="col-4 pl-4">UBICACION: {usuario.nombreLocalidad}</div>
				<div className="col-2">PARCELA: {usuario.predio}</div>
				<div className="col-2">SUP: {usuario.supFisica}</div>
				<div className="col-4">No. CUENTA: {`${usuario.cuenta}.${usuario.subcta}`}</div>
			</div>
			<div className="row pl-5 pr-5 mt-2 mb-2">
				<div className="col-4 pl-4">HABILITADORA: {dictamen.habilitadora}</div>
				<div className="col-2">MODULO: {usuario.entidad}</div>
				<div className="col-6">CADER: {dictamen.cader}</div>
			</div>

			<div className="row pt-5"></div>
			<div className="row pt-5"></div>

			<div className="row pl-5 pr-5 m-2">LABORES CULTURALES: {dictamen.laboresCulturales}</div>
			<div className="row pl-5 pr-5 m-2">
				FECHA DE RIEGO: {dictamen.fechaRiego.toLocaleDateString()}
			</div>
			<div className="row pl-5 pr-5 m-2">
				FECHA DE SIEMBRA EN SECO: {dictamen.fechaSiembraSeco.toLocaleDateString()}
			</div>
			<div className="row pl-5 pr-5 m-2">
				FECHA DE SIEMBRA EN HUMEDO: {dictamen.fechaSiembraHumedo.toLocaleDateString()}
			</div>
			<div className="row pl-5 pr-5 m-2">DICTAMEN TECNICO: {dictamen.dictamenTecnico}</div>

			<div className="row pt-5"></div>
			<div className="row pl-5 pr-5 m-2">
				OBSERVACIONES:
				<div className="d-block w-100 rounded border" style={{ height: 100 }}>
					{dictamen.observaciones}
				</div>
			</div>

			<div className="row pt-5"></div>
			<div className="row pt-5"></div>

			<div className="row pt-5 d-flex justify-content-center">
				{privilegios.generarDictamenesDdr && (
					<div className="col-4 d-flex flex-column ml-3">
						<p className="pb-4 text-center">
							JEFE DE DISTRITO DE DESARROLLO RURAL 002 RÍO COLORADO
						</p>
						<hr />
						<div className="text-center">
							<b>NOMBRE Y FIRMA</b>
						</div>
					</div>
				)}

				<div className="col-4 d-flex flex-column ml-3">
					<p className="pb-5 text-center">CESVBC</p>
					<hr />
					<div className="text-center">
						<b>NOMBRE Y FIRMA</b>
					</div>
				</div>
			</div>

			<div className="row m-3 d-flex justify-content-center pt-5">
				{usuario.dictamen ? (
					<button type="button" className="btn btn-outline-primary d-print-none" onClick={imprimir}>
						<i className="fas fa-print"></i>
						<span> Imprimir</span>
					</button>
				) : (
					<button
						type="button"
						className="btn btn-outline-primary ml-5 d-print-none"
						onClick={handleSaveDictamen}
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
