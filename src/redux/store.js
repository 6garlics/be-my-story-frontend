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
    case "UPDATE_USERNAME":
      newState.userName = action.data.userName;
      break;

    case "UPDATE_COVER":
      newState.coverUrl = action.data.coverUrl;
      break;

    case "UPDATE_IMAGES":
      console.log(action.data.imgUrl);
      newState.images = [
        ...currentState.images,
        { index: action.data.index, imgUrl: action.data.imgUrl },
      ];
      break;

    case "SORT_IMAGES":
      const newImages = [...currentState.images];
      newImages.sort(function (a, b) {
        return a.index - b.index;
      });
      console.log("newImages", newImages);
      newState.images = newImages;
      break;
  }

  return newState;
}

export const store = createStore(reducer);
