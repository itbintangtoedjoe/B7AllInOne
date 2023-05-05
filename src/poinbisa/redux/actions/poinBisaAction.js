import ReedemableItem from "../../models/ReedemableItem";
import { isReachable } from "../../../general/redux/actions";

export const FETCH_REDEEMABLE_ITEMS = "FETCH_REDEEMABLE_ITEMS";

export const fetchRedeemableItems = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: FETCH_REDEEMABLE_ITEMS,
      loadingState: true,
    });

    const goodToGo = await isReachable();
    if (goodToGo === true) {
      try {
        const response = await fetch(
          // 'https://portal.bintang7.com/sensoryonline/sensory/get-sensory-list',
          "https://portal.bintang7.com/tara/poin-bisa/get-all-items",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseData = await response.json();
        let allItems = [];
        const jsonObj = JSON.parse(responseData);
        const arrayItems = [...jsonObj];
        // console.log(allItems);
        // console.log(responseData[0]);
        // responseData.map &&
        arrayItems.map(function (item) {
          allItems.push(
            new ReedemableItem(
              item.RecordID,
              item.NamaItem,
              item.DetailItem,
              item.PoinItem,
              item.ImgUrl
            )
          );
        });
        // console.log(allItems);
        dispatch({
          type: FETCH_REDEEMABLE_ITEMS,
          allItems: allItems,
          loadingState: false,
        });
      } catch (err) {
        throw err;
      }
    } else {
      dispatch({
        type: FETCH_REDEEMABLE_ITEMS,
        allItems: [],
        loadingState: false,
      });
      return goodToGo;
    }
  };
};
