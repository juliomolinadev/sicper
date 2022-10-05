import React from "react";
import { useSelector } from "react-redux";
import { ProductoresModule } from "./ProductoresModule";
import { PadronDeUsuariosSection } from "./PadronDeUsuariosSection";
import { useState } from "react";
import { PadronesDeCultivos } from "./PadronesDeCultivos";

export const PadronScreen = () => {
	const { privilegios } = useSelector((state) => state.auth);

	const sections = {
		"Padron De Usuarios": privilegios.consultarPadron && <PadronDeUsuariosSection />,
		"Padron De Productores": privilegios.editarProductores && <ProductoresModule />,
		"Padrones De Cultivos": privilegios.editarPadronesCultivos && <PadronesDeCultivos />
	};

	const [section, setSection] = useState("Padron De Usuarios");
	const sectionsNames = Object.keys(sections);

	return (
		<div className="mt-5">
			<div className="d-flex justify-content-center">
				<div className="btn-group btn-group-toggle d-print-none">
					{sectionsNames.map((sectionName) => {
						if (sections[sectionName]) {
							return (
								<div
									key={sectionName}
									className={`btn btn-outline-primary ${sectionName === section && "active"}`}
									onClick={() => setSection(sectionName)}
								>
									{sectionName}
								</div>
							);
						} else return <div key={sectionName}></div>;
					})}
				</div>
			</div>

			<div className="mt-5">{sections[section]}</div>
		</div>
	);
};
