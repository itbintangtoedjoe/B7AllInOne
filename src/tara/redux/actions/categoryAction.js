import Category from "../../models/Category";
import Subcategory from "../../models/Subcategory";
import { isReachable } from "../../../general/redux/actions";

export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const FETCH_SUBCATEGORIES = "FETCH_SUBCATEGORIES";

export const fetchCategories = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: FETCH_CATEGORIES,
      loadingState: true,
    });

    const goodToGo = await isReachable();
    if (goodToGo === true) {
      try {
        const response = await fetch(
          "https://portal.bintang7.com/tara/categories/get-all-categories",
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
        // console.log(responseData);
        const loadedCategories = [];

        responseData.map(function (item) {
          loadedCategories.push(
            new Category(
              item.Id,
              item.NamaKategori,
              item.CreatedBy.NamaUser,
              item.CreationDate,
              item.LastUpdatedOn,
              item.IsDeleted
            )
          );
        });
        // console.log(loadedCategories);

        dispatch({
          type: FETCH_CATEGORIES,
          allCategories: loadedCategories,
          loadingState: false,
        });
      } catch (err) {
        throw err;
      }
    } else {
      dispatch({
        type: FETCH_CATEGORIES,
        allCategories: [],
        loadingState: false,
      });
      return goodToGo;
    }
  };
};

export const fetchSubcategories = (idKategori) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FETCH_SUBCATEGORIES,
      loadingState: true,
    });

    const goodToGo = await isReachable();
    if (goodToGo === true) {
      try {
        const response = await fetch(
          "https://portal.bintang7.com/tara/categories/get-all-subcategories",
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
        // console.log(responseData);
        const loadedSubcategories = [];

        responseData.map(function (item) {
          loadedSubcategories.push(
            new Subcategory(
              item.Id,
              item.NamaSubkategori,
              item.Category.Id,
              item.CreatedBy.NamaUser,
              item.CreationDate,
              item.LastUpdatedOn,
              item.IsDeleted
            )
          );
        });
        // console.log(loadedSubcategories);
        const displayedSubcategories = loadedSubcategories.filter(
          (sub) => sub.category_id == idKategori
        );

        dispatch({
          type: FETCH_SUBCATEGORIES,
          allSubcategories: displayedSubcategories,
          idKategori: idKategori,
          loadingState: false,
        });
      } catch (err) {
        throw err;
      }
    } else {
      dispatch({
        type: FETCH_SUBCATEGORIES,
        allSubcategories: [],
        idKategori: 0,
        loadingState: false,
      });
      return goodToGo;
    }
  };
};
