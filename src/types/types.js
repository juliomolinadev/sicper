// Tipos de acciones

export const types = {
	login: "[Login] Login",
	entity: "[Login] Entity",
	logout: "[Login] Logout",

	uiSetError: "[UI] Set Error",
	uiRemoveError: "[UI] Remove Error",
	uiStartLoading: "[UI] Start Loading",
	uiFinishLoading: "[UI] Finish Loading",

	derechosAddNew: "[Derechos] New derecho",
	derechosActive: "[Derechos] Set active derecho",
	derechosLoad: "[Derechos] Load derechos",
	derechosUpdated: "[Derechos] Updated derecho",
	derechosDelete: "[Derechos] Delete derecho",
	derechosLogoutCleaning: "[Derechos] Logout Cleaning",

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
	setUsuario: "[Alta Permisos] Set usuario",
	unsetUsuario: "[Alta Permisos] Unset usuario",

	altaPermisoOpenProductoresModal: "[Alta Permisos] Open productores modal",
	altaPermisoCloseProductoresModal: "[Alta Permisos] Close productores modal",
	loadProductores: "[Alta Permisos] Load prosuctores",
	clearProductores: "[Alta Permisos] Clear prosuctores",
	setProductor: "[Alta Permisos] Set productor",
	unsetProductor: "[Alta Permisos] Unset productor",

	altaPermisoOpenNuevoProductorModal: "[Alta Permisos] Open nuevo prouctor modal",
	altaPermisoCloseNuevoProductorModal: "[Alta Permisos] Close nuevo prouctor modal"
};
