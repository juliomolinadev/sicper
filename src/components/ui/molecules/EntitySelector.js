import React, { useState } from "react";
import { useSelector } from "react-redux";

export const EntitySelector = () => {
	const { entities } = useSelector((state) => state.entidades);

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
	// console.log("entities en lugar: ", entities);

	const [entity, setentity] = useState("");
	console.log("entity en lugar: ", entity);

	const handleSetEntity = ({ target }) => {
		setentity(target.value);
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
