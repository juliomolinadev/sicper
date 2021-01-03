import React from "react";
import { NavbarComponent } from "../components/ui/NavbarComponent";
import { Switch, Route, Redirect } from "react-router-dom";

import { SicperScreen } from "../components/sicper/SicperScreen";
import { PadronScreen } from "../components/padron/PadronScreen";
import { ConfiguracionScreen } from "../components/configuracion/ConfiguracionScreen";
import { ReportesScreen } from "../components/reportes/ReportesScreen";
import { TransferenciasScreen } from "../components/transferencias/TransferenciasScreen";
import { PermisosScreen } from "../components/permisos/PermisosScreen";
import { NuevoPermisoScreen } from "../components/permisos/NuevoPermisoScreen";
import { AutorizadosScreen } from "../components/autorizados/AutorizadosScreen";
import Header from "../components/ui/Header";

export const DashboardRoutes = () => {
	return (
		<div className="container-fluid pr-4">
			<NavbarComponent />
			<Header />
			<Switch>
				<Route exact path="/sicper" component={SicperScreen} />
				<Route exact path="/padron" component={PadronScreen} />
				<Route exact path="/permisos" component={PermisosScreen} />
				<Route exact path="/transferencias" component={TransferenciasScreen} />
				<Route exact path="/reportes" component={ReportesScreen} />
				<Route exact path="/autorizados" component={AutorizadosScreen} />
				<Route exact path="/configuracion" component={ConfiguracionScreen} />
				<Route exact path="/nuevo-permiso" component={NuevoPermisoScreen} />

				<Redirect to="/sicper" />
			</Switch>
		</div>
	);
};
