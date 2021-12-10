import React from "react";
import Modal from "react-modal";
import { saveConstancy } from "../../helpers/DB/saveConstancy";

export const PrintConstancyModal = ({ openModal, constancia, constancySaved, setModalState }) => {
	const { folio, apPaterno, apMaterno, nombre, predio, tipoLocalidad } = constancia;
	const { nombreLocalidad, fecha, supRiego, cuenta, subcta, modulo, sistemaRiego } = constancia;
	const { municipio, estado } = constancia;

	const dateOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
	const customStyles = {
		content: {
			width: "1125px",
			height: "1500px",
			overflow: "auto"
		}
	};

	const closeModal = () => {
		setModalState((state) => ({ ...state, openModal: false }));
	};

	const imprimir = () => {
		window.print();
	};

	const handleSaveConstancy = async () => {
		const date = new Date();
		const anio = date.getFullYear();
		const saveSuccess = await saveConstancy(constancia, anio);

		if (saveSuccess) setModalState((state) => ({ ...state, constancySaved: true }));
	};

	return (
		<Modal
			isOpen={openModal}
			onRequestClose={closeModal}
			style={customStyles}
			closeTimeoutMS={200}
			className="printModalSanidad p-5"
			overlayClassName="modal-fondo"
		>
			<div className="row p-5 d-flex align-items-center">
				<div className="col-5">
					<div className="d-flex">
						<img src={"./logos/semarnat2.png"} alt="Logo semarnat" style={{ maxHeight: 110 }} />
					</div>
				</div>

				<div className="col-4">
					<div className="d-flex ">
						<img src={"./logos/cna.png"} alt="Logo cna" style={{ maxHeight: 70 }} />
					</div>
				</div>

				<div className="col-3">
					<div className="d-flex flex-column text-right">
						<div>
							<b>OFICIO:</b>
						</div>
						<div>B00.807.05.DR.014/{folio}</div>
						<div>
							<b>LUGAR:</b>
						</div>
						<div>MEXICALI, B. C.</div>
						<div>
							<b>FECHA:</b>
						</div>
						<div>{fecha.toLocaleString("es-MX", dateOptions).toUpperCase()}</div>
					</div>
				</div>
			</div>

			<div className="row">
				<div className="col-12">
					<p>
						<b>
							ORGANISMO DE CUENCA PENÍNSULA DE BAJA CALIFORNIA
							<br />
							DIRECCIÓN DE INFRAESTRUCTURA HIDROAGRÍCOLA
							<br />
							DISTRITO DE RIEGO 014, RÍO COLORADO, B.C. Y SONORA
							<br />
							JEFATURA DEL PADRÓN DE USUARIOS
						</b>
					</p>
				</div>
			</div>

			<div className="row pt-5"></div>

			<div className="row">
				<div className="col-12">
					<p>
						<b>A QUIEN CORRESPONDA:</b>
					</p>
				</div>
			</div>

			<div className="row pt-5"></div>

			<div className="row m-3 d-flex flex-column justify-content-center mt-2">
				<p clssName="paragraph">
					&nbsp;&nbsp;&nbsp;&nbsp; CON FUNDAMENTO EN LOS ARTÍCULOS 52, 67 INCISO A), 70 DE LA LEY DE
					AGUAS NACIONALES; 92 Y 102 DEL REGLAMENTO DEL DISTRITO DE RIEGO DEL RÍO COLORADO Y DEMÁS
					RELATIVOS DE LA NORMATIVIDAD VIGENTE, ARTÍCULOS 11 LETRA B FRACCIÓN V, 73 FRACCIÓN XLI,
					ASÍ COMO SU ÚLTIMO PÁRRAFO, 79, FRACCIÓN XVII REGLAMENTO INTERIOR DE LA COMISIÓN NACIONAL
					DEL AGUA, CON BASE EN LA BÚSQUEDA DE LOS DATOS DEL PROMOVENTE REALIZADA EL DÍA DE HOY POR
					EL ÁREA RESPONSABLE DEL PADRÓN DE USUARIOS (SIPAD), SE INFORMA QUE OBRA REGISTRO PADRÓN DE
					USUARIOS DEL DISTRITO DE RIEGO 014, RÍO COLORADO, BAJA CALIFORNIA Y SONORA A NOMBRE DE{" "}
					<b>
						{apPaterno} {apMaterno} {nombre}
					</b>
					, CON EL NÚMERO DE CUENTA <b>{`${cuenta}.${subcta}`}</b>,{" "}
					<b>EN EL MÓDULO DE RIEGO NÚMERO {modulo}</b> CON UNA SUPERFICIE DE{" "}
					<b>{supRiego} HECTAREAS</b> DE DERECHOS DE RIEGO DE <b>{sistemaRiego.toUpperCase()}</b>,
					EN LA <b>PARCELA NÚMERO {predio}</b>, EN{" "}
					<b>
						{tipoLocalidad.toUpperCase()} {nombreLocalidad}
					</b>
					, DEL MUNICIPIO DE <b>{municipio.toUpperCase()}</b>, <b>{estado.toUpperCase()}</b>.
				</p>

				<p clssName="paragraph">
					&nbsp;&nbsp;&nbsp;&nbsp; LA PRESENTE SE EXTIENDE CON CARÁCTER INFORMATIVO A PETICIÓN DEL
					INTERESADO PARA LOS FINES QUE ESTIME CONVENIENTES Y SE LE RECUERDA QUE DE ACUERDO A LA
					NORMATIVA EN MATERIA DE AGUAS ES DEBER DEL USUARIO, CONCESIONARIO O ASIGNATARIO, SEGUIR
					LOS TRÁMITES Y PROCEDIMIENTOS ADMINISTRATIVOS RELATIVOS PARA LA ACTUALIZACIÓN DE LA
					INFORMACIÓN, TRANSMISIÓN, CESIÓN DE DERECHOS DE AGUA EN EL PADRÓN.
				</p>

				<p clssName="paragraph">
					&nbsp;&nbsp;&nbsp;&nbsp; LA CONSTANCIA SE EMITE, SIN PREJUZGAR SOBRE LA EXISTENCIA DE
					ALGUNA OTRA SOLICITUD, PROCEDIMIENTO ADMINISTRATIVO, SUCESORIO O JUDICIAL QUE NO SE HAYA
					HECHO DE CONOCIMIENTO AL MOMENTO DE FORMULAR SU PETICIÓN.
				</p>
			</div>

			<div className="row pt-5"></div>

			<div className="row pt-5">
				<p>
					<b>
						<div className="col-12">ATENTAMENTE</div>
					</b>
				</p>
			</div>

			<div className="row d-flex mt-5">
				<p>
					<b>
						<div className="col-12">
							DR. JULIO ALFONSO NAVARRO URBINA,
							<br />
							ING. EN JEFE DEL DISTRITO DE RIEGO 014,
							<br />
							RÍO COLORADO, BAJA CALIFORNIA Y SONORA
						</div>
					</b>
				</p>
			</div>

			<div className="row m-3 mt-5">
				<b>
					<div className="col-12">
						C.c.p.- Archivo <br />
						VMMR/JDLA/pcf
					</div>
				</b>
			</div>
			<div className="row">
				<div className="col-10 d-flex">
					<div className=" align-self-end">
						Avenida Insurgentes Sur Número 2416, Colonia Copilco el Bajo, Alcaldía Coyoacán, Código
						postal 04340, Ciudad de México. Teléfono: 55 5174 4000 www.gob.mx/conagua
						<hr />
					</div>
				</div>

				<div className="col-2">
					<div className="d-flex justify-content-end">
						<img src={"./logos/mexico2021.jpg"} alt="Logo mexico" style={{ maxHeight: 170 }} />
					</div>
				</div>
			</div>

			<div className="row m-3 d-flex justify-content-center pt-5">
				{constancySaved ? (
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
