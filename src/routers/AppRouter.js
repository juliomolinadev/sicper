import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { AuthRouter } from "./AuthRouter";
import { DashboardRoutes } from "./DashboardRoutes";
import { firebase } from "../firebase/firebase-config";
import { useDispatch } from "react-redux";
import {
	loadEntity,
	loadEntityData,
	loadPrivilegios,
	login,
	setEntity,
	setPrivilegios
} from "../actions/auth";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
	const dispatch = useDispatch();

	const [checking, setChecking] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		firebase.auth().onAuthStateChanged(async (user) => {
			if (user?.uid) {
				const entity = await loadEntity(user.uid);
				const entityData = await loadEntityData(entity.claveEntidad);
				const privilegios = await loadPrivilegios(entity.rol);
				const { nombre, img, clave, dotacion, titular } = entityData;

				dispatch(login(user.uid, user.displayName));
				dispatch(setEntity(nombre, img, clave, dotacion, titular, entity.rol, entity.modulo));
				dispatch(setPrivilegios(privilegios));
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
				// dispatch(logout());
			}
			setChecking(false);
		});
	}, [dispatch, setChecking, setIsLoggedIn]);

	if (checking) {
		return (
			<div className="container pt-5 d-flex justify-content-center">
				<div className="spinner-border text-primary" role="status">
					<span className="sr-only">Cargando...</span>
				</div>
			</div>
		);
	}

	return (
		<Router>
			<div>
				<Switch>
					<PublicRoute path="/auth" component={AuthRouter} isAuthenticated={isLoggedIn} />
					<PrivateRoute exat isAuthenticated={isLoggedIn} path="/" component={DashboardRoutes} />
					<Redirect to="/auth/login" />
				</Switch>
			</div>
		</Router>
	);
};
