import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { AuthRouter } from "./AuthRouter";
import { DashboardRoutes } from "./DashboardRoutes";
import { firebase } from "../firebase/firebase-config";
import { useDispatch } from "react-redux";
import { loadEntity, login, setEntity } from "../actions/auth";
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

				const { entidad, img, claveEntidad } = entity;
				dispatch(login(user.uid, user.displayName));
				dispatch(setEntity(entidad, img, claveEntidad));
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
			setChecking(false);
		});
	}, [dispatch, setChecking, setIsLoggedIn]);

	if (checking) {
		return <h1>Espere...</h1>;
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
