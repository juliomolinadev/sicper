// import { types } from "../types/types";

// const initialState = {
// 	derechos: [],
// 	active: null
// };

// export const derechosReducer = (state = initialState, action) => {
// 	switch (action.type) {
// 		case types.derechosActive:
// 			return {
// 				...state,
// 				active: {
// 					...action.payload
// 				}
// 			};

// 		case types.derechosAddNew:
// 			return {
// 				...state,
// 				derechos: [action.payload, ...state.derechos]
// 			};

// 		case types.derechosLoad:
// 			return {
// 				...state,
// 				derechos: [...action.payload]
// 			};

// 		case types.derechosUpdated:
// 			return {
// 				...state,
// 				derechos: state.derechos.map((derecho) =>
// 					derecho.id === action.payload.id ? action.payload.derecho : derecho
// 				)
// 			};

// 		case types.derechosDelete:
// 			return {
// 				...state,
// 				active: null,
// 				derechos: state.derechos.filter((derecho) => derecho.id !== action.payload)
// 			};

// 		case types.derechosLogoutCleaning:
// 			return {
// 				...state,
// 				active: null,
// 				derechos: []
// 			};

// 		default:
// 			return state;
// 	}
// };
