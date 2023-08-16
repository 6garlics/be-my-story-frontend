import { createStore } from "redux";
import { useDispatch } from "react-redux";

const initialState = {
  coverUrl: "",
  images: [],
};

function reducer(currentState = initialState, action) {
  const newState = { ...currentState };

  switch (action.type) {
    case "UPDATE_COVER":
      newState.coverUrl = action.data.coverUrl;
      break;
    case "UPDATE_IMAGES":
      console.log(action.data.imgUrl);
      newState.images = [
        ...currentState.images,
        { imgUrl: action.data.imgUrl },
      ];
      break;
  }

  return newState;
}

export const store = createStore(reducer);
