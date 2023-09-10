import { createStore } from "redux";
import { useDispatch } from "react-redux";

const initialState = {
  userName: "",
  coverUrl: "",
  images: [],
};

function reducer(currentState = initialState, action) {
  const newState = { ...currentState };

  switch (action.type) {
    case "RESET":
      newState.userName = "";
      newState.coverUrl = "";
      newState.images = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ];
      break;
    case "UPDATE_USERNAME":
      newState.userName = action.data.userName;
      break;

    case "UPDATE_COVER":
      newState.coverUrl = action.data.coverUrl;
      break;

    case "UPDATE_IMAGES":
      console.log(action.data.imgUrl);
      newState.images[action.data.pageNum] = action.data.imgUrl;
      break;

    case "SORT_IMAGES":
      const newImages = [...currentState.images];
      newImages.sort(function (a, b) {
        return a.pageNum - b.pageNum;
      });
      console.log("newImages", newImages);
      newState.images = newImages;
      break;
  }

  return newState;
}

export const store = createStore(reducer);
