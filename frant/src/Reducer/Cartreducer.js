import { add_To_cart, remove_From_cart, Empty_cart } from "../store/Type";

const initioal = {
  cart: [],
  subTotal: 0,
  items: 0,
  cartLength: 0,
};

const cartreducer = (state = initioal, Action) => {
  switch (Action.type) {
    case add_To_cart:
      const same = state.cart.find((item) => item._id === Action.payload._id);
      if (same) {
        return {
          ...state,
          cartLength: state.cart.length,
          items: state.items,
        };
      } else {
        state.cart.push(Action.payload);
        let total = 0;
        state.cart.map((item) => (total = item.cart * Number(item.price)));
        state.subTotal = state.subTotal + total;
        let totalitem = 0;
        state.cart.map((item) => (totalitem = item.cart));
        state.items = state.items + totalitem;
        if (state.cart.length <= 0) {
          let data = { name: "smit" };
          localStorage.setItem("404page", data);
        } else {
          localStorage.removeItem("404page");
        }
        return {
          ...state,
          cart: state.cart,
          cartLength: state.cart.length,
          items: state.items,
        };
      }
    case remove_From_cart:
      state.items = state.items - Action.payload.cart;
      let index = Action.payload.index;
      state.cart.splice(index, 1);
      let totalr = 0;
      state.cart.map(
        (item) => (totalr = totalr + item.cart * Number(item.price))
      );
      state.subTotal = totalr;
      if (state.cart.length <= 0) {
        let data = { name: "smit" };
        localStorage.setItem("404page", data);
      } else {
        localStorage.removeItem("404page");
      }
      return {
        ...state,
        cartLength: state.cart.length,
        cart: state.cart,
        items: state.items,
      };

    case Empty_cart:
      state.cart.length = 0;
      state.cart.subTotal = 0;
      state.items = 0;
      if (state.cart.length <= 0) {
        let data = { name: "smit" };
        localStorage.setItem("404page", data);
      } else {
        localStorage.removeItem("404page");
      }
      return {
        ...state,
        items: state.items,
        cartLength: state.length,
        cart: state.cart,
      };
    default:
      return state;
  }
};

export default cartreducer;
