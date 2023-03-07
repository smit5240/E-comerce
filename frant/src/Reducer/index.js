import cartreducer from "./Cartreducer";
import { combineReducers } from "redux";

const reducer = combineReducers({
  Cart: cartreducer,
});
export default reducer;
