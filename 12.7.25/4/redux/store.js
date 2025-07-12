import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { matchReducer } from "./reducer";

export const store = createStore(matchReducer, applyMiddleware(thunk));
