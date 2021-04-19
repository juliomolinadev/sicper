// Tipos de acciones

export const types = {
	login: "[Login] Login",
	entity: "[Login] Entity",
	logout: "[Login] Logout",
	setPrivilegios: "[Login] Privilegios",

	uiSetError: "[UI] Set Error",
	uiRemoveError: "[UI] Remove Error",
	uiStartLoading: "[UI] Start Loading",
	uiFinishLoading: "[UI] Finish Loading",

	altaPermisoOpenPrintPermisoModal: "[Alta Permisos] Open permiso modal",
	altaPermisoClosePrintPermisoModal: "[Alta Permisos] Close permiso modal",

	altaPermisoOpenCultivosModal: "[Alta Permisos] Open cultivos modal",
	altaPermisoCloseCultivosModal: "[Alta Permisos] Close cultivos modal",
	loadCultivos: "[Alta Permisos] Load cultivos",
	clearCultivos: "[Alta Permisos] Clear cultivos",
	setCultivo: "[Alta Permisos] Set cultivo",
	unsetCultivo: "[Alta Permisos] unset cultivo",

	altaPermisoOpenUsuariosModal: "[Alta Permisos] Open usuarios modal",
	altaPermisoCloseUsuariosModal: "[Alta Permisos] Close usuarios modal",
	loadUsuarios: "[Alta Permisos] Load usuarios",
	clearUsuarios: "[Alta Permisos] Clear usuarios",
	setUsuarios: "[Alta Permisos] Set usuarios",
	unsetUsuarios: "[Alta Permisos] Unset usuarios",
	setUsuario: "[Alta Permisos] Set usuario",
	unsetUsuario: "[Alta Permisos] Unset usuario",

	altaPermisoOpenProductoresModal: "[Alta Permisos] Open productores modal",
	altaPermisoCloseProductoresModal: "[Alta Permisos] Close productores modal",
	loadProductores: "[Alta Permisos] Load prosuctores",
	clearProductores: "[Alta Permisos] Clear prosuctores",
	setProductor: "[Alta Permisos] Set productor",
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

	openUserRoleModal: "[UI] Open User Role Modal",
	closeUserRoleModal: "[UI] Close User Role Modal"
};
