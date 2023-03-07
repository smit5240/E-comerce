import reducer from "../Reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

export const Store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
composeWithDevTools();
