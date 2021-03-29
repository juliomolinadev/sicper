// import React from "react";
// import Modal from "react-modal";
// import { useDispatch, useSelector } from "react-redux";

// import { closeImprimirReporteModal } from "../../actions/scenes/reportesScreen";
// import { GraficoPrincipalesCultivos } from "../charts/GraficoPrincipalesCultivos";
// import { PermisosTable } from "../tables/PermisosTable";

// export const PrintReportesModal = () => {
// 	const { openImprimirReporteModal } = useSelector((state) => state.scenes.reportesScreen);

// 	const dispatch = useDispatch();

// 	const closeModal = () => {
// 		dispatch(closeImprimirReporteModal());
// 	};

// 	const imprimir = () => {
// 		window.print();
// 	};

// 	const customStyles = {
// 		content: {
// 			width: "1125px",
// 			height: "500px",
// 			overflow: "auto"
// 		}
// 	};

// 	return (
// 		<Modal
// 			isOpen={openImprimirReporteModal}
// 			onRequestClose={closeModal}
// 			style={customStyles}
// 			closeTimeoutMS={200}
// 			className="printModalSanidad"
// 			overlayClassName="modal-fondo"
// 		>
// 			<div className="printme">
// 				<div className="row">
// 					<h1>Header</h1>
// 				</div>

// 				<div className="row">
// 					<div className="row m-3 d-flex justify-content-center pt-5">
// 						<button
// 							type="button"
// 							className="btn btn-outline-primary ml-5 d-print-none"
// 							onClick={imprimir}
// 						>
// 							<i className="fas fa-print"></i>
// 							<span> Imprimir</span>
// 						</button>

// 						<button
// 							type="button"
// 							className="btn btn-outline-primary ml-5 d-print-none ml-3"
// 							onClick={closeModal}
// 						>
// 							<i className="fas fa-sign-out-alt"></i>
// 							<span> Cerrar</span>
// 						</button>
// 					</div>
// 				</div>

// 				<div className="row d-flex justify-content-center">
// 					<div className="col-sm-6 ">
// 						<GraficoPrincipalesCultivos />
// 					</div>
// 				</div>

// 				<div className="row d-flex justify-content-center">
// 					<div className="col-sm-10 ">
// 						<PermisosTable />
// 					</div>
// 				</div>
// 			</div>
// 		</Modal>
// 	);
// };
