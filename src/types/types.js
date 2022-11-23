// Tipos de acciones

export const types = {
	login: "[Login] Login",
	entity: "[Login] Entity",
	logout: "[Login] Logout",
	setPrivilegios: "[Login] Privilegios",
	setVariablesGlobales: "[Login] Set Variables Globales",
	setCicloConsulta: "[Login] Set Ciclo Consulta",
	setEstadoExpedicionModulo: "[Login] Set Estado Expedicion Modulo",

	uiSetError: "[UI] Set Error",
	uiRemoveError: "[UI] Remove Error",
	uiStartLoading: "[UI] Start Loading",
	uiFinishLoading: "[UI] Finish Loading",
	setEntidadesConAcceso: "[UI] set Entidades ConAcceso",

	setEntities: "[Configuracion] Set Entities",
	setCultivosConPadron: "[Configuracion] Set Cultivos Con Padron",

	altaPermisoOpenPrintPermisoModal: "[Alta Permisos] Open permiso modal",
	altaPermisoClosePrintPermisoModal: "[Alta Permisos] Close permiso modal",
	setTipoNormal: "[Alta Permisos] Set Tipo Normal",
	setTipoExtra: "[Alta Permisos] Set Tipo Extra",

	altaPermisoOpenCultivosModal: "[Alta Permisos] Open cultivos modal",
	altaPermisoCloseCultivosModal: "[Alta Permisos] Close cultivos modal",
	altaPermisoOpenCultivoAnteriorModal: "[Alta Permisos] Open cultivo anterior modal",
	altaPermisoCloseCultivoAnteriorModal: "[Alta Permisos] Close cultivo anterior modal",
	loadCultivos: "[Alta Permisos] Load cultivos",
	setCultivosAnteriores: "[Alta Permisos] Set Cultivos Anteriores",
	setProductoresAnteriores: "[Alta Permisos] Set Productores Anteriores",
	clearCultivos: "[Alta Permisos] Clear cultivos",
	setCultivo: "[Alta Permisos] Set cultivo",
	unsetCultivo: "[Alta Permisos] unset cultivo",
	setTipoSemilla: "[Alta Permisos] set Tipo Semilla",
	setCultivoAnterior: "[Alta Permisos] Set cultivo anterior",
	unsetCultivoAnterior: "[Alta Permisos] unset cultivo anterior",
	addNuevoCultivo: "[Catalogo Cultivos] Add Nuevo Cultivo",
	removeCultivo: "[Catalogo Cultivos] Remove Cultivo",

	setCuotaCultivo: "[Alta Permisos] Set Cuota Cultivo",

	altaPermisoOpenUsuariosModal: "[Alta Permisos] Open usuarios modal",
	altaPermisoCloseUsuariosModal: "[Alta Permisos] Close usuarios modal",
	loadUsuarios: "[Alta Permisos] Load usuarios",
	clearUsuarios: "[Alta Permisos] Clear usuarios",
	setUsuarios: "[Alta Permisos] Set usuarios",
	unsetUsuarios: "[Alta Permisos] Unset usuarios",
	setUsuario: "[Alta Permisos] Set usuario",
	unsetUsuario: "[Alta Permisos] Unset usuario",
	setComplemento: "[Alta Permisos] Set Complemento",
	setUpdatingPadron: "[Padron] Set Updating Padron",
	setUpdatingPermisos: "[TestArea] Set Updating Permisos",
	unsetUpdatingPermisos: "[TestArea] Unset Updating Permisos",
	unsetUpdatingPadron: "[Padron] Unset Updating Padron",
	setUpdatingReacomodos: "[Padron] Set Updating Reacomodos",
	unsetUpdatingReacomodos: "[Padron] Unset Updating Reacomodos",
	setDictamenData: "[Padron] Set Dictamen Data",
	setDictamenDataSaved: "[Padron] Set Dictamen Data Saved",
	setPadronesCultivos: "[Padron] Set Padrones Cultivos",
	setConcesionSelected: "[Padron] Set Concesion Selected",

	altaPermisoOpenProductoresModal: "[Alta Permisos] Open productores modal",
	altaPermisoCloseProductoresModal: "[Alta Permisos] Close productores modal",
	loadProductores: "[Alta Permisos] Load prosuctores",
	clearProductores: "[Alta Permisos] Clear prosuctores",
	setProductor: "[Alta Permisos] Set productor",
	setComplementos: "[Alta Permisos] Set Complementos",
	setPermisosComplemento: "[Alta Permisos] Set Permisos Complemento",
	unsetPermisosComplemento: "[Alta Permisos] Unset Permisos Complemento",
	unsetProductor: "[Alta Permisos] Unset productor",

	altaPermisoOpenNuevoProductorModal: "[Alta Permisos] Open nuevo prouctor modal",
	altaPermisoCloseNuevoProductorModal: "[Alta Permisos] Close nuevo prouctor modal",

	altaPermisosSetFormValues: "[Alta Permisos] Set form value",
	altaPermisosUnsetFormValues: "[Alta Permisos] Unset form value",
	altaPermisosSetSubmitData: "[Alta Permisos] Set onSubmit data",
	altaPermisosUnsetSubmitData: "[Alta Permisos] unSet onSubmit data",

	altaPermisosSetEnEspera: "[Alta Permisos] Set en espera",
	altaPermisosUnsetEnEspera: "[Alta Permisos] unSet en espera",

	altaPermisosEnableSaveButton: "[Alta Permisos] Enable save button",
	altaPermisosDisableSaveButton: "[Alta Permisos] Disable save button",

	altaPermisosEnablePrintButton: "[Alta Permisos] Enable print button",
	altaPermisosDisablePrintButton: "[Alta Permisos] Disable print button",

	permisosScreenSetPermisos: "[Permisos Screen] Set permisos",
	permisosScreenUnsetPermisos: "[Permisos Screen] Unset permisos",
	permisosScreenSetPermisoSelected: "[Permisos Screen] Set permiso selected",
	permisosScreenUnsetPermisoSelected: "[Permisos Screen] Unset permiso selected",
	permisosScreenSetSuperficies: "[Permisos Screen] Set superficies",
	permisosScreenUnsetSuperficies: "[Permisos Screen] Unset superficies",
	permisosScreenSetPreCancelPermits: "[Permisos Screen] Set Pre Cancel Permits",
	permisosScreenUnsetPreCancelPermits: "[Permisos Screen] Unset Pre Cancel Permits",
	permisosScreenSetPermitToCancel: "[Permisos Screen] Set Pre Permit To Cancel",
	permisosScreenUnsetPermitToCancel: "[Permisos Screen] Unset Pre Permit To Cancel",
	openGuiaForm: "[Permisos Screen] Open Guia Form",
	closeGuiaForm: "[Permisos Screen] Close Guia Form",
	openGuiaPrint: "[Permisos Screen] Open Guia Print",
	closeGuiaPrint: "[Permisos Screen] Close Guia Print",
	setFolioGuia: "[Permisos Screen] Set Folio Guia",
	setDataGuia: "[Permisos Screen] Set Data Guia",
	setGuiaSaved: "[Permisos Screen] Set Guia Saved",
	clearGuia: "[Permisos Screen] Clear Guia",

	autorizadosScreenSetModulo: "[Autorizados Screen] Set modulo",
	autorizadosScreenUnsetModulo: "[Autorizados Screen] Unset modulo",
	autorizadosScreenSetAutorizados: "[Autorizados Screen] Set autorizados",
	autorizadosScreenUnsetAutorizados: "[Autorizados Screen] Unset autorizados",
	openAutorizadosModal: "[Autorizados Screen] Open autorizados modal",
	closeAutorizadosModal: "[Autorizados Screen] Close autorizados modal",
	setAutorizadoSelected: "[Autorizados Screen] Set autorizado selected",
	unsetAutorizadoSelected: "[Autorizados Screen] Unset autorizado selected",
	setSuperficieReferencia: "[Autorizados Screen] Set superficie referencia",
	unsetSuperficieReferencia: "[Autorizados Screen] Unset superficie referencia",
	setFormError: "[Autorizados Screen] Set Form Error",
	removeFormError: "[Autorizados Screen] Unset Form Error",
	setAutorizadosPorCultivo: "[Autorizados Screen] Set autorizados por cultivo",

	sicperScreenSetAutorizados: "[Sicper Screen] Set autorizados",
	sicperScreenUnsetAutorizados: "[Sicper Screen] Unset autorizados",
	sicperScreenSetExpedicion: "[Sicper Screen] Set expedicion",
	sicperScreenUnsetExpedicion: "[Sicper Screen] Unset expedicion",
	sicperScreenSetSuperficieNormal: "[Sicper Screen] Set superficie normal",
	sicperScreenSetSuperficieExtra: "[Sicper Screen] Set superficie extra",

	algodoneroScreenSetPermisos: "[Algodonero Screen] Set permisos",
	algodoneroScreenUnsetPermisos: "[Algodonero Screen] Unset permisos",
	openSanidadModal: "[Algodonero Screen] Open Modal Sanidad",
	closeSanidadModal: "[Algodonero Screen] Close Modal Sanidad",
	openTransferModal: "[Transferencias Screen] Open Modal Transferencias",
	closeTransferModal: "[Transferencias Screen] Close Modal Transferencias",
	enablePrintButton: "[Transferencias Screen] Enable Print Button",
	disablePrintButton: "[Transferencias Screen] Disable Print Button",
	setNuevaTransferencia: "[Transferencias Screen] Set Nueva Transferencia",
	unsetNuevaTransferencia: "[Transferencias Screen] Unset Nueva Transferencia",
	setTransferencia: "[Transferencias Screen] Set Transferencia",
	unsetTransferencia: "[Transferencias Screen] Unset Transferencia",
	setTransferencias: "[Transferencias Screen] Set Transferencias",
	unsetTransferencias: "[Transferencias Screen] Unset  Transferencias",

	setDataPrincipalesCultivos: "[Entidades] Set Data Principales Cultivos",
	unsetDataPrincipalesCultivos: "[Entidades] Unset Data Principales Cultivos",
	setPermisos: "[Entidades] Set permisos",
	unsetPermisos: "[Entidades] Unset permisos",
	setCampoOrdenador: "[Entidades] Set Campo Ordenador",
	unsetCampoOrdenador: "[Entidades] Unset Campo Ordenador",
	openImprimirReporteModal: "[Scenes] Open Imprimir Reporte Modal",
	closeImprimirReporteModal: "[Scenes] Close Imprimir Reporte Modal",

	setSystemUsers: "[Entidades] Set System Users",
	setSystemUserSelected: "[Entidades] Set System User Selected",
	unsetSystemUserSelected: "[Entidades] Unset System User Selected",
	setUserRoles: "[Entidades] Set Users Roles",
	unsetUserRoles: "[Entidades] Unset Users Roles",
	setUserRoleSelected: "[Entidades] Set User Role Selected",
	unsetUserRoleSelected: "[Entidades] Unset User Role Selected",
	setPrivilegesToEdit: "[Entidades] Set Privileges To Edit",
	unsetPrivilegesToEdit: "[Entidades] Unset Privileges To Edit",

	setLocalties: "[Entidades] Set Localties",
	unsetLocalties: "[Entidades] Unset Localties",
	setSelectedLocalties: "[Entidades] Set Selected Localties",
	unsetSelectedLocalties: "[Entidades] Unset Selected Localties",
	setLocaltieSelected: "[Entidades] Set Localtie Selected",
	unsetLocaltieSelected: "[Entidades] Unset Localtie Selected",
	openLocaltiesModal: "[Entidades] Open Localties Modal",
	closeLocaltiesModal: "[Entidades] Close Localties Modal",

	setExpedicion: "[Reportes] Set Expedicion",
	setAutorizados: "[Reportes] Set Autorizados",

	openUserRoleModal: "[UI] Open User Role Modal",
	closeUserRoleModal: "[UI] Close User Role Modal",

	setLocaltiesAsignacion: "[Asignacion Screen] Set Localties",
	setSelectedLocaltiesAsignacion: "[Asignacion Screen] Set Selected Localties",
	setTechnicians: "[Asignacion Screen] Set Technicians",
	updateTechnicians: "[Asignacion Screen] Update Technicians",
	updatePadronLocalties: "[Asignacion Screen] Update Padron Localties",
	setTechnicianSelected: "[Asignacion Screen] Set Technician Selected",
	unsetTechnicianSelected: "[Asignacion Screen] Unset Technician Selected",
	setBusqueda: "[Asignacion Screen] Set Busqueda",
	setFolioSanidad: "[Labores Screen] Set Folio Sanidad",
	updatePermiso: "[Labores Screen] Update Permiso",
	deletePermiso: "[Labores Screen] Delete Permiso",
	setTechniciansLabores: "[Labores Screen] Set Technicians Labores",
	setNewTecnico: "[Labores Screen] Set New Tecnico",

	setCheckState: "[Labores Checks] Set Check State",
	checkDesfoliado: "[Labores Checks] Check Desfoliado",
	uncheckDesfoliado: "[Labores Checks] Uncheck Desfoliado",
	checkCosechado: "[Labores Checks] Check Cosechado",
	uncheckCosechado: "[Labores Checks] Uncheck Cosechado",
	checkDesvarado: "[Labores Checks] Check Desvarado",
	uncheckDesvarado: "[Labores Checks] Uncheck Desvarado",
	checkDisqueado: "[Labores Checks] Check Disqueado",
	uncheckDisqueado: "[Labores Checks] Uncheck Disqueado",
	checkDesarraigado: "[Labores Checks] Check Desarraigado",
	uncheckDesarraigado: "[Labores Checks] Uncheck Desarraigado",
	checkBarbechado: "[Labores Checks] Check Barbechado",
	uncheckBarbechado: "[Labores Checks] Uncheck Barbechado",
	checkPagado: "[Labores Checks] Check Pagado",
	uncheckPagado: "[Labores Checks] Uncheck Pagado"
};
