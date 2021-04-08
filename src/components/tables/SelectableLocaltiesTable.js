import React from "react";
import {
	setLocalties,
	startLoadLocaltiesFromUnassignedPermits
} from "../../actions/entidades/localidades";
import { CustomSelectableTable } from "../tables/CustomSelectableTable";

export const SelectableLocaltiesTable = () => {
	startLoadLocaltiesFromUnassignedPermits();
	const columns = [
		{
			name: "Nombre",
			selector: "nombre"
		},

		{
			name: "Edad",
			selector: "edad"
		},

		{
			name: "Color",
			selector: "color"
		}
	];

	const data = [
		{
			nombre: "Juan",
			edad: 25,
			color: "rojo"
		},

		{
			nombre: "Pedro",
			edad: 12,
			color: "verde"
		},

		{
			nombre: "Maria",
			edad: 35,
			color: "azul"
		}
	];
	const contextMessage = { singular: "localidad", plural: "localidades", message: "para asignar" };

	return (
		<CustomSelectableTable
			title={"Localidades disponibles"}
			columns={columns}
			data={data}
			setSelectedRowsFunction={setLocalties}
			contextMessage={contextMessage}
		/>
	);
};
