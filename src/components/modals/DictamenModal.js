import React, { useState } from "react";
import DatePicker from "react-date-picker";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { removeError, setError } from "../../actions/ui";
import { useFormToUpper } from "../../hooks/UseFormToUpper";
import { setDictamenData } from "../../actions/usuarios";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		height: "450px",
		overflow: "auto"
	}
};

Modal.setAppElement("#root");

export const DictamenModal = ({ isOpenModal, setDictamenFormState, setIsOpenDictamenPrint }) => {
	const dispatch = useDispatch();

	const { msgError } = useSelector((state) => state.ui);
	const { cultivos } = useSelector((state) => state.altaPermisos);

	const cultivosIds = [];
	const filteredCultivos = cultivos.filter((cultivo) => {
		if (!cultivosIds.includes(cultivo.id)) {
			cultivosIds.push(cultivo.id);
			return true;
		} else return false;
	});

	const closeModal = () => {
		setDictamenFormState({ isOpenDictamenForm: false });
	};

	const [formValues, handleInputChange] = useFormToUpper();
	const {
		nombreProductor = "",
		habilitadora = "",
		laboresCulturales = "",
		dictamenTecnico = "",
		observaciones = "",
		cultivoDictamen = ""
	} = formValues;

	const [cader, setCader] = useState("");
	const [fechaRiego, setFechaRiego] = useState(null);
	const [fechaSiembraSeco, setFechaSiembraSeco] = useState(null);
	const [fechaSiembraHumedo, setFechaSiembraHumedo] = useState(null);

	// console.log(cader);
	// console.log({ ...formValues, fechaRiego, fechaSiembraSeco, fechaSiembraHumedo });

	const caders = [
		"HECHICERA",
		"BENITO JUAREZ",
		"CERRO PRIETO",
		"GPR VICTORIA",
		"COLONIAS NUEVAS",
		"DELTA",
		"VALLE CHICO"
	];

	const handleRegister = (e) => {
		e.preventDefault();

		if (isFormValid()) {
			dispatch(
				setDictamenData({
					...formValues,
					cader,
					fechaRiego,
					fechaSiembraSeco,
					fechaSiembraHumedo
				})
			);

			setIsOpenDictamenPrint(true);
		}
	};

	const isFormValid = () => {
		if (cultivos.find((cultivo) => cultivo.clave === Number(cultivoDictamen)) === undefined) {
			dispatch(setError("Se requiere clave de cultivo válida"));
			return false;
		} else if (nombreProductor.trim().length === 0) {
			dispatch(setError("Se requiere nombre del productor"));
			return false;
		} else if (habilitadora.trim().length === 0) {
			dispatch(setError("Se requiere habilitadora"));
			return false;
		} else if (cader.trim().length === 0) {
			dispatch(setError("Se requiere cader"));
			return false;
		} else if (laboresCulturales.trim().length === 0) {
			dispatch(setError("Se requiere labores culturales"));
			return false;
		} else if (dictamenTecnico.trim().length === 0) {
			dispatch(setError("Se requiere dictamen técnico"));
			return false;
		} else if (fechaRiego === null) {
			dispatch(setError("Se requiere fecha de riego"));
			return false;
		} else if (fechaSiembraSeco === null) {
			dispatch(setError("Se requiere fecha de siembra en seco"));
			return false;
		} else if (fechaSiembraHumedo === null) {
			dispatch(setError("Se requiere fecha de siembra en humedo"));
			return false;
		}
		dispatch(removeError());

		return true;
	};

	return (
		<Modal
			isOpen={isOpenModal}
			onRequestClose={closeModal}
			style={customStyles}
			closeTimeoutMS={200}
			className="modal"
			overlayClassName="modal-fondo"
		>
			<div className="row m-3 d-flex justify-content-center">
				<h1>Registro de nuevo dictamen</h1>
			</div>

			<div className="row m-3 d-flex justify-content-center">* Campos obligatorios</div>

			<form className="container pb-4" autoComplete="waa" onSubmit={handleRegister}>
				{msgError && <div className="auth__alert-error ">{msgError}</div>}

				<div className="row p-2">
					<div className="col-sm-12">
						<label htmlFor="cultivos" className="d-flex">
							<div>* Cultivo:</div>
							<input
								className="form-control ml-4 w-75"
								name="cultivoDictamen"
								value={cultivoDictamen}
								onChange={handleInputChange}
								list="cultivos"
							/>
						</label>
					</div>

					<datalist id="cultivos">
						{filteredCultivos.map((cultivo) => (
							<option key={cultivo.id} value={cultivo.clave}>
								{cultivo.nombre}
							</option>
						))}
					</datalist>

					{/* <div className="col-sm-6">
						<input
							type="text"
							className="form-control"
							name="nombreProductor"
							value={nombreProductor}
							autoComplete="off"
							onChange={handleInputChange}
						/>
					</div> */}
				</div>

				<div className="row p-2">
					<div className="col-sm-6">
						* Nombre Productor:
						<input
							type="text"
							className="form-control"
							name="nombreProductor"
							value={nombreProductor}
							autoComplete="off"
							onChange={handleInputChange}
						/>
					</div>

					<div className="col-sm-6">
						* habilitadora:
						<input
							type="text"
							className="form-control"
							name="habilitadora"
							value={habilitadora}
							autoComplete="waa"
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="row p-2">
					<div className="col-sm-6">
						* CADER:
						<select
							name="campo"
							id="campo"
							type="text"
							value={cader}
							onChange={({ target }) => setCader(target.value)}
							className="form-control"
						>
							<option hidden defaultValue="">
								Seleccionar CADER
							</option>

							{caders.map((cader) => (
								<option key={cader} value={cader}>
									{cader}
								</option>
							))}
						</select>
					</div>

					<div className="col-sm-6">
						* Labores Culturales:
						<input
							type="text"
							className="form-control"
							name="laboresCulturales"
							value={laboresCulturales}
							autoComplete="waa"
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="row p-2">
					<div className="col-sm-6">
						{/* dictamen tecnico */}
						* Dictamen Tecnico:
						<input
							type="text"
							className="form-control"
							name="dictamenTecnico"
							value={dictamenTecnico}
							autoComplete="waa"
							onChange={handleInputChange}
						/>
					</div>

					<div className="col-sm-6">
						{/* fecha de riego */}
						* Fecha de riego:
						<DatePicker
							type="date"
							className="d-block"
							name="fechaRiego"
							onChange={setFechaRiego}
							value={fechaRiego}
							format={"dd/MM/yyyy"}
						/>
					</div>
				</div>

				<div className="row p-2">
					<div className="col-sm-6">
						* Fecha de siembra en seco:
						<DatePicker
							type="date"
							className="d-block"
							name="fechaSiembraSeco"
							onChange={setFechaSiembraSeco}
							value={fechaSiembraSeco}
							format={"dd/MM/yyyy"}
						/>
					</div>

					<div className="col-sm-6">
						* Fecha de siembra en humedo:
						<DatePicker
							type="date"
							className="d-block"
							name="fechaSiembraHumedo"
							onChange={setFechaSiembraHumedo}
							value={fechaSiembraHumedo}
							format={"dd/MM/yyyy"}
						/>
					</div>
				</div>

				<div className="row p-2">
					<div className="col-sm-12">
						Observaciones:
						<textarea
							tabIndex="10"
							type="text"
							className="form-control"
							rows="5"
							name="observaciones"
							value={observaciones}
							onChange={handleInputChange}
						></textarea>
					</div>
				</div>

				{msgError && <div className="auth__alert-error mt-3">{msgError}</div>}

				<div className="row d-flex justify-content-center pt-3">
					<button type="submit" className="btn btn-outline-primary">
						Revisar
					</button>
				</div>
			</form>
		</Modal>
	);
};
