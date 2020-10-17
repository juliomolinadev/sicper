import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { LoginScreen2 } from "../components/auth/LoginScreen2";
import { AuthRouter } from "./AuthRouter";
import { DashboardRoutes } from "./DashboardRoutes";

export const AppRouter = () => {
	return (
		<Router>
			<div>
				<Switch>
					<Route path="/auth" component={AuthRouter} />
					<Route exat path="/" component={DashboardRoutes} />
				</Switch>
			</div>
		</Router>
	);
};
