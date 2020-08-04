import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { LoginScreen } from "../components/auth/LoginScreen";
import { SicperScreen } from "../components/sicper/SicperScreen";

export const AppRouter = () => {
	return (
		<Router>
			<div>
				<Switch>
					<Route exact path="/login" component={LoginScreen} />
					<Route exact path="/" component={SicperScreen} />
					<Redirect to="/" />
				</Switch>
			</div>
		</Router>
	);
};
