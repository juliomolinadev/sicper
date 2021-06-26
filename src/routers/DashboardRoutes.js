import React from "react";
import { NavbarComponent } from "../components/ui/NavbarComponent";
import { Switch, Route, Redirect } from "react-router-dom";

import { SicperScreen } from "../components/sicper/SicperScreen";
import { PadronScreen } from "../components/padron/PadronScreen";
import { PermisosScreen } from "../components/permisos/PermisosScreen";
import { NuevoPermisoScreen } from "../components/permisos/NuevoPermisoScreen";
import { TransferenciasScreen } from "../scenes/TransferenciasScreen";
import { AsignacionScreen } from "../scenes/AsignacionScreen";
import { LaboresScreen } from "../scenes/LaboresScreen";
import { AutorizadosScreen } from "../components/autorizados/AutorizadosScreen";
import { ReportesScreen } from "../scenes/ReportesScreen";
import { ConfiguracionScreen } from "../scenes/ConfiguracionScreen";
import { TestArea } from "../components/templates/TestArea";
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
				<Route exact path="/nuevo-permiso" component={NuevoPermisoScreen} />
				<Route exact path="/transferencias" component={TransferenciasScreen} />
				<Route exact path="/asignacion" component={AsignacionScreen} />
				<Route exact path="/labores" component={LaboresScreen} />
				<Route exact path="/autorizados" component={AutorizadosScreen} />
				<Route exact path="/reportes" component={ReportesScreen} />
				<Route exact path="/configuracion" component={ConfiguracionScreen} />
				<Route exact path="/test" component={TestArea} />

				<Redirect to="/sicper" />
			</Switch>
		</div>
	);
};
