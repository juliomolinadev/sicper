import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { authReducer } from "../reducers/authReducer";
import { uiReducer } from "../reducers/uiReducer";
import { altaPermisosReducer } from "../reducers/altaPermisosReducer";
import { permisosScreenReducer } from "../reducers/permisosScreenReducer";
import { autorizadosReducer } from "../reducers/autorizadosReducer";
import { sicperReducer } from "../reducers/sicperReducer";
import { algodoneroScreenReducer } from "../reducers/algodoneroScreenReducer";
import { entidadesReducer } from "../reducers/entidades/entidadesReducer";
import { scenesReducer } from "../reducers/scenes/scenesReducer";

const composeEnhancers =
	(typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
	auth: authReducer,
	ui: uiReducer,
	scenes: scenesReducer,
	entidades: entidadesReducer,
	sicperScreen: sicperReducer,
	permisosScreen: permisosScreenReducer,
	algodoneroScreen: algodoneroScreenReducer,
	altaPermisos: altaPermisosReducer,
	autorizadosScreen: autorizadosReducer
});

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

// const estructuraStore = {
// 	auth: "Datos del usuario logueado",
// 	ui: "Datos de componentes de la interfaz",
// 	scenes: "Datos de cada una de las pantallas de la app",
// 	entidades: "Datos de entidades del negocio"
// };
