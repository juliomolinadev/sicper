import React, { useReducer } from "react";

import { producersHeaders as headers } from "../../helpers/constants/reportsColumns";
import { loadProducersGlobal } from "../../helpers/DB/loadProducersGlobal";
import { CustomTable } from "../tables/CustomTable";
import { productoresColumns } from "../tables/configTables";
import { productoresReducer } from "./productoresReducer";
import { ProductorDetail } from "./ProductorDetail";
import { EditProductorModal } from "../modals/EditProductorModal";

export const ProductoresModule = () => {
	const initialState = {
		inputValue: "",
		campo: "",
		productores: [],
		productorSelected: null,
		openEditModal: false,
		msgError: null
	};
	const [state, dispatch] = useReducer(productoresReducer, initialState);
	// console.log(state);
	const { inputValue, campo, productores, productorSelected, openEditModal, msgError } = state;

	const handleInputChange = ({ target }) => {
		dispatch({
			type: "setInput",
			payload: target.value
		});
	};

	const handleSelectChange = ({ target }) => {
		dispatch({
			type: "setSelect",
			payload: target.value
		});
	};

	const getProducers = async () => {
		if (campo.length) {
			const productores = await loadProducersGlobal(inputValue, campo);
			dispatch({
				type: "setProductores",
				payload: productores
			});
		}
	};

	const setProductorSelected = (productor) => {
		dispatch({
			type: "setProductorSelected",
			payload: productor
		});
	};

	const handleKeyUp = (event) => {
		if (event.key === "Enter") {
			getProducers();
		}
	};

	return (
		<>
			<div className="row">
				<div className="col-sm-8">
					<h4>Productores</h4>
					<div className="row mt-2">
						<div className="col-sm-8">
							<label htmlFor="palabra">PARAMETRO DE BUSQUEDA:</label>
							<input
								type="text"
								className="form-control"
								name="palabra"
								id="palabra"
								autoComplete="off"
								value={inputValue}
								onChange={handleInputChange}
								onKeyUp={handleKeyUp}
							/>
						</div>
						<div className="col-sm-4">
							<label htmlFor="campo">BUSCAR EN:</label>
							<div className="d-flex">
								<select
									name="campo"
									id="campo"
									type="text"
									value={campo}
									onChange={handleSelectChange}
									className="form-control"
								>
									<option hidden defaultValue={false}>
										-
									</option>
									{headers.map((header) => {
										if (header.search) {
											return (
												<option key={header.id} value={header.id}>
													{header.header}
												</option>
											);
										} else return <option key={header.id} style={{ display: "none" }}></option>;
									})}
								</select>
								<button
									className="btn btn-outline-primary ml-2"
									type="button"
									onClick={getProducers}
								>
									<i className="fas fa-search"></i>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{productores.length > 0 && (
				<div className="row">
					<div className="col-sm-8">
						<CustomTable
							title={productores.length === 0 ? "No se encontraron usuarios" : "Usuarios"}
							columns={productoresColumns}
							data={productores}
							simpleSetFunction={setProductorSelected}
						></CustomTable>
					</div>

					{productorSelected && (
						<div className="col-sm-4">
							<ProductorDetail
								productor={productorSelected}
								dispatch={dispatch}
								reload={getProducers}
							/>
						</div>
					)}
				</div>
			)}

			{openEditModal && (
				<EditProductorModal
					openEditModal={openEditModal}
					productor={productorSelected}
					msgError={msgError}
					dispatch={dispatch}
					reload={getProducers}
					resetProductor={setProductorSelected}
				/>
			)}
		</>
	);
};
