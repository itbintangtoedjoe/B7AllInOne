import { Alert } from "react-native";

import Document from "../../models/Document";
import { isReachable } from "../../../general/redux/actions";

export const FETCH_DOCUMENTS = "FETCH_DOCUMENTS";
export const FETCH_LATEST_DOCUMENTS = "FETCH_LATEST_DOCUMENTS";

export const fetchDocuments = (idSubkategori, namaRole) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FETCH_DOCUMENTS,
      loadingState: true,
    });

    const goodToGo = await isReachable();
    if (goodToGo === true) {
      try {
        const response = await fetch(
          "https://portal.bintang7.com/tara/documents/get-all-documents",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            // body: JSON.stringify(data),
          }
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseData = await response.json();
        const loadedDocuments = [];

        responseData.map(function (item) {
          loadedDocuments.push(
            new Document(
              item.Id,
              item.Judul,
              item.Deskripsi,
              item.Subcategory.Id,
              item.PathUrl,
              item.AccessiblePath,
              item.Keywords,
              item.ValidUntil,
              item.TargetedRolesInString,
              item.CreatedBy.NamaUser,
              item.CreationDate,
              item.LastUpdatedOn,
              item.IsDeleted
            )
          );
        });

        // console.log(loadedDocuments);

        const documentsByRole = loadedDocuments.filter(
          (doc) =>
            doc.subcategory_id == idSubkategori &&
            String(doc.targeted_roles).includes(namaRole)
        );

        dispatch({
          type: FETCH_DOCUMENTS,
          allDocuments: documentsByRole,
          loadingState: false,
        });
      } catch (err) {
        return Alert.alert("Something went wrong", err);
      }
    } else {
      dispatch({
        type: FETCH_DOCUMENTS,
        allDocuments: [],
        loadingState: false,
      });
      return goodToGo;
    }
  };
};

export const fetchLatestDocuments = (nik, namaRole) => {
  let data = {
    nik,
  };

  return async (dispatch, getState) => {
    dispatch({
      type: FETCH_LATEST_DOCUMENTS,
      loadingState: true,
    });

    const goodToGo = await isReachable();
    if (goodToGo === true) {
      try {
        const response = await fetch(
          "https://portal.bintang7.com/tara/documents/get-latest-documents",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            // body: JSON.stringify(data),
          }
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseData = await response.json();
        const loadedDocuments = [];

        responseData.map(function (item) {
          loadedDocuments.push(
            new Document(
              item.Id,
              item.Judul,
              item.Deskripsi,
              item.Subcategory.Id,
              item.PathUrl,
              item.AccessiblePath,
              item.Keywords,
              item.ValidUntil,
              item.TargetedRolesInString,
              item.CreatedBy.NamaUser,
              item.CreationDate,
              item.LastUpdatedOn,
              item.IsDeleted
            )
          );
        });

        // console.log(loadedDocuments);

        const documentsByRole = loadedDocuments.filter((doc) =>
          String(doc.targeted_roles).includes(namaRole)
        );

        let displayedDocuments = documentsByRole;
        if (
          documentsByRole != undefined &&
          documentsByRole != null &&
          documentsByRole.length > 5
        ) {
          displayedDocuments = [];
          for (let i = 0; i < 5; i++) {
            displayedDocuments.push(documentsByRole[i]);
          }
        }

        // for (let doc of loadedDocuments) {
        //   console.log(doc.last_updated_on);
        // }

        dispatch({
          type: FETCH_LATEST_DOCUMENTS,
          dokumenTerakhir: displayedDocuments,
          loadingState: false,
        });
      } catch (err) {
        console.error(err);
        // return Alert.alert('Something went wrong', err);
      }
    } else {
      dispatch({
        type: FETCH_LATEST_DOCUMENTS,
        dokumenTerakhir: [],
        loadingState: false,
      });
      return goodToGo;
    }
  };
};
