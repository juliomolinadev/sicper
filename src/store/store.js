import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { authReducer } from "../reducers/authReducer";
import { uiReducer } from "../reducers/uiReducer";
import { altaPermisosReducer } from "../reducers/altaPermisosReducer";
import { permisosScreenReducer } from "../reducers/permisosScreenReducer";
import { autorizadosReducer } from "../reducers/autorizadosReducer";

const composeEnhancers =
	(typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
	auth: authReducer,
	ui: uiReducer,
	permisosScreen: permisosScreenReducer,
	autorizadosScreen: autorizadosReducer,
	altaPermisos: altaPermisosReducer
});

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
