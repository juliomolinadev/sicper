import React from "react";
import { Provider } from "react-redux";

import { store } from "./store/store";
// import { AppRouter } from "./routers/AppRouter";
// import { Page404 } from "./scenes/Page404";
import { ServicioSuspendido } from "./scenes/ServicioSuspendido";

export const SicperApp = () => {
	return (
		<div>
			<script srs="filesaver.js"></script>
			<Provider store={store}>
				{/* <Page404 /> */}
				{/* <AppRouter /> */}
				<ServicioSuspendido />
			</Provider>
		</div>
	);
};
