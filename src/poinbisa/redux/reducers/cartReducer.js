import CartItem from "../../models/CartItem";
import {
  FETCH_CART_ITEMS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SEND_REDEEM_ORDER,
  EDIT_ITEM_QUANTITY,
} from "../actions";

const initialState = {
  cartItems: {},
  grandTotal: 0,
  item: {},
  loadingState: false,
  operation: "add",
  itemID: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      let addedItem = action.item;
      let newOrUpdatedItem;
      if (addedItem != undefined) {
        if (state.cartItems[addedItem.id]) {
          //udah ada di cart
          newOrUpdatedItem = new CartItem(
            addedItem.id,
            "nik",
            addedItem.nama_item,
            addedItem.detail_item,
            addedItem.poin_item,
            state.cartItems[addedItem.id].quantity + 1,
            addedItem.img_url
          );
        } else {
          newOrUpdatedItem = new CartItem(
            addedItem.id,
            "nik",
            addedItem.nama_item,
            addedItem.detail_item,
            addedItem.poin_item,
            1,
            addedItem.img_url
          );
        }
        return {
          ...state,
          cartItems: { ...state.cartItems, [addedItem.id]: newOrUpdatedItem },
          addToCartStatus: action.addToCartStatus,
          loadingState: action.loadingState,
        };
      } else {
        return {
          ...state,
          loadingState: action.loadingState,
        };
      }

    case FETCH_CART_ITEMS:
      // console.log('di reducer');
      // console.log(action.cartItems);
      // console.log('gtot: ', action.grandTotal);
      return {
        ...state,
        loadingState: action.loadingState,
        // items: {...state.items, [addedItem.id]: newOrUpdatedItem},
        cartItems: action.cartItems,
        grandTotal: action.grandTotal,
      };

    case SEND_REDEEM_ORDER:
      return {
        ...state,
        loadingState: action.loadingState,
        sendOrderStatus: action.status,
      };

    case EDIT_ITEM_QUANTITY:
      addedItem = action.item;
      console.log("item reducer: ");
      console.log(action);
      if (addedItem != undefined) {
        console.log("added item undefined");
        if (state.cartItems[addedItem.id]) {
          console.log("cart items di reducer edit");
          console.log(state.cartItems);
          //udah ada di cart
          // newOrUpdatedItem = new CartItem(
          //   addedItem.id,
          //   "nik",
          //   addedItem.nama_item,
          //   addedItem.detail_item,
          //   addedItem.poin_item,
          //   state.cartItems[addedItem.id].quantity + 1,
          //   addedItem.img_url
          // );
          if (action.payload == "ADD") {
            const itemInCart = state.cartItems.find(
              (item) => item.id == action.itemID
            );
            itemInCart.jumlah_item++;
          }
        }
        return {
          ...state,
          // cartItems: { ...state.cartItems, [addedItem.id]: newOrUpdatedItem },
          addToCartStatus: action.addToCartStatus,
          // loadingState: action.loadingState,
        };
      } else {
        return {
          ...state,
          // loadingState: action.loadingState,
        };
      }

    // case REMOVE_FROM_CART:
    //   //productid kiriman dari action cart
    //   const selectedCartItem = state.items[action.productId];
    //   const currentQty = selectedCartItem.quantity;
    //   let updatedCartItems;
    //   if (currentQty > 1) {
    //     const updatedCartItem = new CartItem(
    //       selectedCartItem.quantity - 1,
    //       selectedCartItem.price,
    //       selectedCartItem.title,
    //       selectedCartItem.sum - selectedCartItem.price,
    //     );
    //     updatedCartItems = {
    //       ...state.items,
    //       [action.productId]: updatedCartItem,
    //     };
    //   } else {
    //     updatedCartItems = {...state.items};
    //     delete updatedCartItems[action.productId];
    //   }
    //   console.log(state.totalPoints - selectedCartItem.price);
    //   return {
    //     ...state,
    //     items: updatedCartItems,
    //     totalPoints: state.totalPoints - selectedCartItem.price,
    //   };
    // case ADD_ORDER:
    //   return initialState;
    // case DELETE_PRODUCT:
    //   if (!state.items[action.productId]) {
    //     return state;
    //   }
    //   const updatedItems = {...state.items};
    //   const itemTotal = state.items[action.productId].sum;
    //   delete updatedItems[action.productId];

    //   return {
    //     ...state,
    //     items: updatedItems,
    //     //balikin total amount-subtotal produk yg diapus
    //     totalPoints: state.totalPoints - itemTotal,
    //   };
  }
  return state;
};
