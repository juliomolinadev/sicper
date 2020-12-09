import { types } from "../types/types";
import { loadUltimosPermisos } from "../helpers/loadUltimosPermisos";
import { loadPermisos } from "../helpers/loadPermisos";
import { loadSuperficiesCultivos } from "../helpers/loadSuperficiesCultivos";

export const startLoadPermisos = (modulo) => {
	return async (dispatch) => {
		const permisos = await loadUltimosPermisos(modulo);
		dispatch(setPermisos(permisos));
	};
};

export const startLoadPermisosSearch = (palabra, modulo) => {
	return async (dispatch) => {
		const permisos = await loadPermisos(palabra, modulo);
		dispatch(setPermisos(permisos));
	};
};

export const startLoadSuperficies = (modulo) => {
	return async (dispatch) => {
		const superficies = await loadSuperficiesCultivos(modulo);
		dispatch(setSuperficies(superficies));
	};
};

export const setSuperficies = (superficies) => ({
	type: types.permisosScreenSetSuperficies,
	payload: superficies
});

export const unsetSuperficies = () => ({
	type: types.permisosScreenUnsetSuperficies
});

export const setPermisos = (permisos) => ({
	type: types.permisosScreenSetPermisos,
	payload: permisos
});

export const unsetPermisos = () => ({
	type: types.permisosScreenUnsetPermisos
});

export const setPermisoSelected = (permiso) => ({
	type: types.permisosScreenSetPermisoSelected,
	payload: permiso.id
});

export const unsetPermisoSelected = () => ({
	type: types.permisosScreenUnsetPermisoSelected
});
// Ctrl + Shift + W R   : Emmet wrap.
// Alt + ↑ / ↓          : Mueve el contenido de una linea o seleccion.
// Shift + Tab          : Quita la indentacion de un bloque seleccionado.
// Alt + Shift + ↑ / ↓  : Clona la linea actual o bloque seleccionado abajo o arriba.
// Ctrl + Shift + L     : Selecciona todas las ocurrencias de la seleccion.
// Ctrl + Shift + K     : Borra la linea actual.
// Ctrl + Shift + ↑ / ↓ : Crea multicursores continuos.
// Ctrl + Alt + U       : Combierte seleccion en mayusculas.
// Ctrl + D             : Selecciona la siguiente ocurencia con multicursor.

// Ctrl + P             : [Input] Lista de busqueda para los archivos del proyecto
// Ctrl + Shift + P     : [Input + >] Lista de busqueda para comandos.
// Ctrl + Shift + O     : [Input + @] Lista de busqueda para las definiciones de elementos (: ordena).
// Ctrl + G             : [Input + :] Buscar una linea en especifico.

// Ctrl + Alt + clk der : Abre tab con la definicion del elemento en cursor, lo crea si no existe.
// Ctrl + Shift + F12   : Abre una ventana que muestra la definicion del elemento en cursor.
// F2                   : Refactorizar, rename.

// Ctrl + K Z           : Modo zen.
// Ctrl + `             : Abre la terminal.
// Ctrl + K Ctrl + S    : Configuracion de shortcuts.
// Ctrl + Shift + V     : Abre archivo en markdown para previsualizar.
// Shift + Alt + S      : Guarda todos los archivos.
// Ctrl + space         : Recupera el autocompletado.

// Ctrl + /             : Comenta la linea donde se encuentre el cursor o el bloque seleccionado.
// Ctrl + Shift + A     : Comenta solo el fragmento seleccionado.
