import CartItem from "../../models/CartItem";
import { isReachable } from "../../../general/redux/actions";
import cartReducer from "../reducers/cartReducer";

export const FETCH_CART_ITEMS = "FETCH_CART_ITEMS";
export const ADD_TO_CART = "ADD_TO_CART";
export const EDIT_ITEM_QUANTITY = "EDIT_ITEM_QUANTITY";
export const SUBSTRACT_ITEM_QUANTITY = "SUBSTRACT_ITEM_QUANTITY";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const SEND_REDEEM_ORDER = "SEND_REDEEM_ORDER";

export const fetchCartItems = (userNIK) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FETCH_CART_ITEMS,
      loadingState: true,
    });

    let data = {
      nik: userNIK,
    };

    const goodToGo = await isReachable();
    if (goodToGo === true) {
      try {
        const response = await fetch(
          // 'https://portal.bintang7.com/sensoryonline/sensory/get-sensory-list',
          "https://portal.bintang7.com/tara/poin-bisa/get-cart-items",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseData = await response.json();
        // console.log(responseData);
        let cartItems = [];
        const jsonObj = JSON.parse(responseData);
        // console.log("");
        // console.log(jsonjsonobjObj);
        const arrayItems = [...jsonObj];
        const grandTotal = arrayItems[0].Grandtotal;
        // console.log(cartItems);
        // console.log(responseData[0]);
        // responseData.map &&
        arrayItems.map(function (item) {
          cartItems.push(
            new CartItem(
              item.RecordID,
              item.NIK,
              item.NamaItem,
              item.DetailItem,
              item.PoinItem,
              item.JumlahItem,
              item.ImgUrl
            )
          );
        });
        // console.log("action");
        // console.log(cartItems);
        // console.log(grandTotal);
        // console.log(cartItems);
        dispatch({
          type: FETCH_CART_ITEMS,
          cartItems: cartItems,
          grandTotal: grandTotal,
          loadingState: false,
        });
        return cartItems;
      } catch (err) {
        throw err;
      }
    } else {
      dispatch({
        type: FETCH_CART_ITEMS,
        cartItems: [],
        grandTotal: 0,
        loadingState: false,
      });
      return goodToGo;
    }
  };
};

export const addToCart = (nik, item) => {
  // return {
  //   type: ADD_TO_CART,
  //   product: product,
  // };
  return async (dispatch, getState) => {
    dispatch({
      type: ADD_TO_CART,
      loadingState: true,
    });
    // console.log("masok add to cart");
    // console.log("item belakang:");
    // console.log(item);
    let data = {
      nik,
      itemID: item.id,
    };
    console.log(data);
    const goodToGo = await isReachable();
    if (goodToGo === true) {
      try {
        const response = await fetch(
          // 'https://portal.bintang7.com/sensoryonline/sensory/get-sensory-list',
          "https://portal.bintang7.com/tara/poin-bisa/add-to-cart",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseData = await response.json();
        console.log(responseData);
        dispatch({
          type: ADD_TO_CART,
          item: item,
          addToCartStatus: responseData,
          loadingState: false,
        });
      } catch (err) {
        throw err;
      }
    } else {
      dispatch({
        type: ADD_TO_CART,
        addToCartStatus: null,
        loadingState: false,
      });
      return goodToGo;
    }
  };
};

export const editItemQuantity = (nik, itemID, operation) => {
  // return {
  //   type: ADD_TO_CART,
  //   product: product,
  // };
  return async (dispatch, getState) => {
    dispatch({
      type: EDIT_ITEM_QUANTITY,
      // loadingState: true,
    });

    let data = {
      nik,
      itemID,
      operation,
    };
    console.log("data edit");
    console.log(data);
    const goodToGo = await isReachable();
    if (goodToGo === true) {
      try {
        const response = await fetch(
          // 'https://portal.bintang7.com/sensoryonline/sensory/get-sensory-list',
          "https://portal.bintang7.com/tara/poin-bisa/edit-item-quantity",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseData = await response.json();
        dispatch({
          type: EDIT_ITEM_QUANTITY,
          // addToCartStatus: responseData,
          // loadingState: false,
        });
      } catch (err) {
        throw err;
      }
    } else {
      dispatch({
        type: EDIT_ITEM_QUANTITY,
        item: itemID,
        operation,
        addToCartStatus: responseData,
        // loadingState: false,
      });
      return goodToGo;
    }
  };
};

export const removeFromCart = (productId) => {
  return {
    type: REMOVE_FROM_CART,
    productId: productId,
  };
};

export const sendRedeemOrder = (nik) => {
  // return {
  //   type: ADD_TO_CART,
  //   product: product,
  // };
  return async (dispatch, getState) => {
    dispatch({
      type: SEND_REDEEM_ORDER,
      loadingState: true,
    });

    let data = {
      nik: nik,
    };
    const goodToGo = await isReachable();
    if (goodToGo === true) {
      try {
        const response = await fetch(
          // 'https://portal.bintang7.com/sensoryonline/sensory/get-sensory-list',
          "https://portal.bintang7.com/tara/poin-bisa/redeem-items",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseData = await response.json();

        // arrayItems.map(function (item) {
        //   new CartItem(
        //     item.RecordID,
        //     item.NIK,
        //     item.NamaItem,
        //     item.DetailItem,
        //     item.PoinItem,
        //     item.JumlahItem,
        //     item.ImgUrl,
        //   );
        // });
        // console.log(cartItems);
        dispatch({
          type: SEND_REDEEM_ORDER,
          status: responseData,
        });
      } catch (err) {
        throw err;
      }
    } else {
      dispatch({
        type: SEND_REDEEM_ORDER,
        status: null,
      });
      return goodToGo;
    }
  };
};
