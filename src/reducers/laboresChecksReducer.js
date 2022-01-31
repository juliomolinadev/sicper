import { types } from "../types/types";

export const laboresChecksReducer = (state, action) => {
	switch (action.type) {
		case types.setCheckState: {
			return action.payload;
		} /* 
            const initialState = [
                0 { name: "desfoliado", tag: "DESFOLIADO",     state: false, editable: true },
                1 { name: "cosechado", tag: "COSECHADO",       state: false, editable: false },
                2 { name: "desvarado", tag: "DESVARADO",       state: false, editable: false },
                3 { name: "disqueado", tag: "DISQUEADO",       state: false, editable: false },
                4 { name: "desarraigado", tag: "DESARRAIGADO", state: false, editable: false },
                5 { name: "barbechado", tag: "BARBECHADO",     state: false, editable: false },
                6 { name: "pagado", tag: "PAGADO",             state: false, editable: false }
            ];
        */

		case types.checkDesfoliado: {
			const newState = state.map((check) => check);
			newState[0].state = true;
			newState[1].editable = true;
			return newState;
		}

		case types.uncheckDesfoliado: {
			const newState = state.map((check) => check);
			newState[0].state = false;
			newState[1].editable = false;
			return newState;
		}

		/* 
           const initialState = [
               0 { name: "desfoliado", tag: "DESFOLIADO",     state: true,  editable: true },
               1 { name: "cosechado", tag: "COSECHADO",       state: false, editable: true },
               2 { name: "desvarado", tag: "DESVARADO",       state: false, editable: false },
               3 { name: "disqueado", tag: "DISQUEADO",       state: false, editable: false },
               4 { name: "desarraigado", tag: "DESARRAIGADO", state: false, editable: false },
               5 { name: "barbechado", tag: "BARBECHADO",     state: false, editable: false },
               6 { name: "pagado", tag: "PAGADO",             state: false, editable: false }
           ];      
        */

		case types.checkCosechado: {
			const newState = state.map((check) => check);
			newState[1].state = true;
			newState[0].editable = false;
			newState[2].editable = true;
			return newState;
		}

		case types.uncheckCosechado: {
			const newState = state.map((check) => check);
			newState[1].state = false;
			newState[0].editable = true;
			newState[2].editable = false;
			return newState;
		}

		/* 
           const initialState = [
               0 { name: "desfoliado", tag: "DESFOLIADO",     state: true,  editable: false },
               1 { name: "cosechado", tag: "COSECHADO",       state: true,  editable: true },
               2 { name: "desvarado", tag: "DESVARADO",       state: false, editable: true },
               3 { name: "disqueado", tag: "DISQUEADO",       state: false, editable: false },
               4 { name: "desarraigado", tag: "DESARRAIGADO", state: false, editable: false },
               5 { name: "barbechado", tag: "BARBECHADO",     state: false, editable: false },
               6 { name: "pagado", tag: "PAGADO",             state: false, editable: false }
           ];      
        */

		case types.checkDesvarado: {
			const newState = state.map((check) => check);
			newState[2].state = true;
			newState[1].editable = false;
			newState[3].editable = true;
			return newState;
		}

		case types.uncheckDesvarado: {
			const newState = state.map((check) => check);
			newState[2].state = false;
			newState[1].editable = true;
			newState[3].editable = false;
			return newState;
		}

		/* 
           const initialState = [
               0 { name: "desfoliado", tag: "DESFOLIADO",     state: true,  editable: false },
               1 { name: "cosechado", tag: "COSECHADO",       state: true,  editable: false },
               2 { name: "desvarado", tag: "DESVARADO",       state: true, editable: true },
               3 { name: "disqueado", tag: "DISQUEADO",       state: false, editable: true },
               4 { name: "desarraigado", tag: "DESARRAIGADO", state: false, editable: false },
               5 { name: "barbechado", tag: "BARBECHADO",     state: false, editable: false },
               6 { name: "pagado", tag: "PAGADO",             state: false, editable: false }
           ];                   
        */

		case types.checkDisqueado: {
			const newState = state.map((check) => check);
			newState[2].editable = false;
			newState[3].state = true;
			newState[4].editable = true;
			newState[5].editable = true;
			return newState;
		}

		case types.uncheckDisqueado: {
			const newState = state.map((check) => check);
			newState[2].editable = true;
			newState[3].state = false;
			newState[4].editable = false;
			newState[5].editable = false;
			return newState;
		}

		/* 
           const initialState = [
               0 { name: "desfoliado", tag: "DESFOLIADO",     state: true,  editable: false },
               1 { name: "cosechado", tag: "COSECHADO",       state: true,  editable: false },
               2 { name: "desvarado", tag: "DESVARADO",       state: true, editable: false },
               3 { name: "disqueado", tag: "DISQUEADO",       state: true, editable: true },
               4 { name: "desarraigado", tag: "DESARRAIGADO", state: false, editable: true },
               5 { name: "barbechado", tag: "BARBECHADO",     state: false, editable: true },
               6 { name: "pagado", tag: "PAGADO",             state: false, editable: false }
           ];            
        */

		case types.checkDesarraigado: {
			const newState = state.map((check) => check);
			newState[3].editable = false;
			newState[4].state = true;
			newState[5].state = false;
			newState[6].editable = true;
			return newState;
		}

		case types.uncheckDesarraigado: {
			const newState = state.map((check) => check);
			newState[3].editable = true;
			newState[4].state = false;
			newState[5].state = false;
			newState[6].editable = false;
			return newState;
		}

		/* 
           const initialState = [
               0 { name: "desfoliado", tag: "DESFOLIADO",     state: true,  editable: false },
               1 { name: "cosechado", tag: "COSECHADO",       state: true,  editable: false },
               2 { name: "desvarado", tag: "DESVARADO",       state: true, editable: false },
               3 { name: "disqueado", tag: "DISQUEADO",       state: true, editable: false },
               4 { name: "desarraigado", tag: "DESARRAIGADO", state: true, editable: true },
               5 { name: "barbechado", tag: "BARBECHADO",     state: false, editable: true },
               6 { name: "pagado", tag: "PAGADO",             state: false, editable: true }
           ];            
        */

		case types.checkBarbechado: {
			const newState = state.map((check) => check);
			newState[3].editable = false;
			newState[4].state = false;
			newState[5].state = true;
			newState[6].editable = true;
			return newState;
		}

		case types.uncheckBarbechado: {
			const newState = state.map((check) => check);
			newState[3].editable = true;
			newState[4].state = false;
			newState[5].state = false;
			newState[6].editable = false;
			return newState;
		}

		/* 
           const initialState = [
               0 { name: "desfoliado", tag: "DESFOLIADO",     state: true,  editable: false },
               1 { name: "cosechado", tag: "COSECHADO",       state: true,  editable: false },
               2 { name: "desvarado", tag: "DESVARADO",       state: true, editable: false },
               3 { name: "disqueado", tag: "DISQUEADO",       state: true, editable: false },
               4 { name: "desarraigado", tag: "DESARRAIGADO", state: false, editable: true },
               5 { name: "barbechado", tag: "BARBECHADO",     state: true, editable: true },
               6 { name: "pagado", tag: "PAGADO",             state: false, editable: true }
           ];            
        */

		case types.checkPagado: {
			const newState = state.map((check) => check);
			newState[4].editable = false;
			newState[5].editable = false;
			newState[6].state = true;
			return newState;
		}

		case types.uncheckPagado: {
			const newState = state.map((check) => check);
			newState[4].editable = true;
			newState[5].editable = true;
			newState[6].state = false;
			return newState;
		}

		/* 
           const initialState = [
               0 { name: "desfoliado", tag: "DESFOLIADO",     state: true,  editable: false },
               1 { name: "cosechado", tag: "COSECHADO",       state: true,  editable: false },
               2 { name: "desvarado", tag: "DESVARADO",       state: true, editable: false },
               3 { name: "disqueado", tag: "DISQUEADO",       state: true, editable: false },
               4 { name: "desarraigado", tag: "DESARRAIGADO", state: false, editable: false },
               5 { name: "barbechado", tag: "BARBECHADO",     state: true, editable: false },
               6 { name: "pagado", tag: "PAGADO",             state: true, editable: true }
           ];            
        */

		default:
			return state;
	}
};
