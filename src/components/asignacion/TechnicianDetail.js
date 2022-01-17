import React, { useEffect, useState } from "react";
import { modulos as modulosTags } from "../../helpers/consts";
import { saveTechnicianModules } from "../../helpers/DB/saveTechnicianModules";
import { types } from "../../types/types";

export const TechnicianDetail = ({ state, dispatch }) => {
	const { technicianSelected: technician } = state;
	const { email, displayName: name, modulos: modulosTechnician, id } = technician;

	const [modulosCard, setModulosCard] = useState(modulosTechnician);
	// console.log({ modulosCard, modulosTechnician });

	useEffect(() => {
		setModulosCard(modulosTechnician);
	}, [modulosTechnician]);

	const addRemoveModule = (moduloOnClick) => {
		const isInTechnician = modulosCard.includes(`${moduloOnClick}`);
		let modulosUpdated = [];

		if (isInTechnician) {
			modulosUpdated = modulosCard.filter((modulo) => modulo !== `${moduloOnClick}`);
		} else {
			modulosUpdated = [...modulosCard];
			modulosUpdated.push(`${moduloOnClick}`);
		}

		setModulosCard(modulosUpdated);
	};

	const handleSaveChanges = async () => {
		const otherTechnicians = [];
		state.technicians.forEach((technician) => {
			if (technician.id !== id) {
				otherTechnicians.push({
					id: technician.id,
					modulos: technician.modulos ?? []
				});
			}
		});

		const updates = await saveTechnicianModules(id, modulosCard, otherTechnicians);
		if (updates)
			dispatch({
				type: types.updateTechnicians,
				payload: updates
			});
	};

	return (
		<div className="border border-info rounded text-center p-3">
			<h4>{name}</h4>
			<div>{email}</div>

			<div className="mt-4">
				{modulosTags.map((modulo) => {
					const tag = getButtonTag(modulo);
					const buttonStyle = modulosCard.includes(`${modulo}`)
						? "btn-primary"
						: "btn-outline-primary";

					if (tag) {
						return (
							<button
								onClick={() => addRemoveModule(modulo)}
								key={tag}
								className={`btn ${buttonStyle} btn-sm m-1 w-25`}
							>
								{tag}
							</button>
						);
					} else return <div key={tag}></div>;
				})}
			</div>

			{somethingChanged(modulosCard, modulosTechnician) && (
				<button onClick={handleSaveChanges} className="btn btn-success mt-4">
					Aplicar cambios
				</button>
			)}
		</div>
	);
};

const getButtonTag = (input) => {
	const modulo = `${input}`;
	switch (modulo) {
		case "dev":
			return false;

		case "UNI01":
		case "UNI02":
		case "UNI03":
			return modulo;

		default:
			return `M-${modulo}`;
	}
};

const somethingChanged = (arrayA, arrayB) => {
	if (arrayA.length !== arrayB.length) return true;

	let thereIsADiference = false;
	arrayA.forEach((element) => {
		const found = arrayB.includes(element);
		if (!found) thereIsADiference = true;
	});

	return thereIsADiference;
};
