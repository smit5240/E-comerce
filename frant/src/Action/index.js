import { add_To_cart, remove_From_cart, Empty_cart } from "../store/Type";

export const addTocart = (data) => {
  return (dispatch) => {
    dispatch({
      type: add_To_cart,
      payload: data,
    });
  };
};

export const removeFromcart = (data) => {
  return (dispatch) => {
    dispatch({
      type: remove_From_cart,
      payload: data,
    });
  };
};

export const Emptycart = (data) => {
  return (dispatch) => {
    dispatch({
      type: Empty_cart,
      payload: data,
    });
  };
};
