import {
  FETCH_CART_ITEMS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SEND_REDEEM_ORDER,
} from '../actions';

const initialState = {
  cartItems: {},
  grandTotal: 0,
  item: {},
  loadingState: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedItem = action.item;

      let newOrUpdatedItem;

      if (state.cartItems[addedItem.id]) {
        //udah ada di cart
        newOrUpdatedItem = new CartItem(
          item.id,
          'nik',
          item.nama_item,
          item.detail_item,
          item.poin_item,
          state.cartItems[addedItem.id].quantity + 1,
          item.img_url,
        );
      } else {
        newOrUpdatedItem = new CartItem(
          item.id,
          'nik',
          item.nama_item,
          item.detail_item,
          item.poin_item,
          1,
          item.img_url,
        );
      }
      return {
        ...state,
        cartItems: {...state.cartItems, [addedItem.id]: newOrUpdatedItem},
        addToCartStatus: action.addToCartStatus,
        loadingState: action.loadingState,
      };

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
