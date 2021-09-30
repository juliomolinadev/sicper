import React from "react";
import { Provider } from "react-redux";

import { store } from "./store/store";
import { AppRouter } from "./routers/AppRouter";

export const SicperApp = () => {
	return (
		<div>
			<script srs="filesaver.js"></script>
			<Provider store={store}>
				<AppRouter />
			</Provider>
		</div>
	);
};
