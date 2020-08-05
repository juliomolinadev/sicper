import React from "react";
import { Navbar } from "../components/ui/Navbar";
import { Switch, Route, Redirect } from "react-router-dom";

import { SicperScreen } from "../components/sicper/SicperScreen";
import { PadronScreen } from "../components/padron/PadronScreen";
import { ConfiguracionScreen } from "../components/configuracion/ConfiguracionScreen";
import { ReportesScreen } from "../components/reportes/ReportesScreen";
import { TransferenciasScreen } from "../components/transferencias/TransferenciasScreen";
import { PermisosScreen } from "../components/permisos/PermisosScreen";

export const DashboardRoutes = () => {
	return (
		<>
			<Navbar />
			<Switch>
				<Route exact path="/sicper" component={SicperScreen} />
				<Route exact path="/padron" component={PadronScreen} />
				<Route exact path="/permisos" component={PermisosScreen} />
				<Route exact path="/transferencias" component={TransferenciasScreen} />
				<Route exact path="/reportes" component={ReportesScreen} />
				<Route exact path="/configuracion" component={ConfiguracionScreen} />

				<Redirect to="/sicper" />
			</Switch>
		</>
	);
};
