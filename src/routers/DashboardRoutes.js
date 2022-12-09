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
import { ServicioSuspendido } from "../scenes/ServicioSuspendido";
import { useSelector } from "react-redux";

export const DashboardRoutes = () => {
	const { entities } = useSelector((state) => state.entidades);
	const { modulo } = useSelector((state) => state.auth);
	const currentEntitie = entities.find((entitie) => entitie.id === modulo);

	return (
		<div className="container-fluid pr-4">
			<NavbarComponent />
			<Header />

			{currentEntitie.acceso ? (
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
			) : (
				<ServicioSuspendido />
			)}
		</div>
	);
};

//  50	Aplicación
//  25	Servicio
//  15	Pantalla
//  10	Sección
//  20	Configurar Informe
//  20	Doc Imprimible
//  15	Informe
//  15	Importar Excel
//  15	Descargar Excel
//  15	Tabla Personalizada
//  12	Registrar Usuarios
//  12	Autenticar Usuarios
//  12	Transacciones
//  12	Escritura en Lotes
//  10	Composición
//  10	Proceso de Datos
//  10	Detalle
//  8	Formulario
//  7	Imprimir Documento
//  7	Alerta Formulario
//  7	Leer BD
//  6	Gráfico
//  6	Alerta Condicional
//  6	Actualizar BD
//  6	Custom Hook
//  5	Botones Dinámicos
//  5	Actualizar Store
//  5	useReducer
//  4	Componente
//  4	Elemento
//  3	Input Compuesto
//  3	Tabla (3ros)
//  3	Modal
//  2	Local Storage
//  2	Navegación
//  2	useState
//  2	Inpun Simple
//  1	Boton
//  1	Alerta Simple
//  1	Leer Store
//
