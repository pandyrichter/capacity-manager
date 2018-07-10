import { combineReducers } from "redux";
import { createStore } from "redux";

import interfaceReducer from "./interface";

const CapacityApp = combineReducers({
  interfaceReducer
});

export const store = createStore(CapacityApp);
