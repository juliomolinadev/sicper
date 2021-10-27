import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEntity } from "../../../actions/auth";

export const EntitySelector = () => {
	const { entities } = useSelector((state) => state.entidades);
	const { rol } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const modulos = entities.filter((entity) => {
		switch (entity.id) {
			case "CNA":
			case "SADER":
			case "CESVBC":
			case "SRL":
				return false;

			default:
				return true;
		}
	});

	const [entity, setentity] = useState("");

	const handleSetEntity = ({ target }) => {
		setentity(target.value);
		const entity = entities.find((entity) => entity.id === target.value);
		dispatch(
			setEntity(
				entity.nombre,
				entity.img,
				entity.clave,
				entity.dotacionGravedad,
				entity.dotacionPozo,
				entity.titular,
				entity.direccion,
				entity.expedicionActivaModulo,
				rol,
				entity.clave
			)
		);
	};

	return (
		<select
			name="campo"
			id="campo"
			type="text"
			value={entity}
			onChange={handleSetEntity}
			className="form-control"
		>
			<option hidden defaultValue="">
				Entidad
			</option>

			{modulos.map((modulo) => (
				<option key={modulo.id} value={modulo.id}>
					{modulo.id}
				</option>
			))}
		</select>
	);
};
