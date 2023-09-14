import { createSlice } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
  name: "bookSlice",
  initialState: { coverUrl: "", images: [] },
  reducers: {
    reset: (state, action) => {
      state.userName = "";
      state.coverUrl = "";
      state.images = Array.from({ length: 15 }, () => "");
    },
    setCover: (state, action) => {
      state.coverUrl = action.payload.coverUrl;
    },
    setImages: (state, action) => {
      console.log(action.payload.imgUrl);
      state.images[action.payload.pageNum] = action.payload.imgUrl;
    },
    sortImages: (state, action) => {
      state.images.sort(function (a, b) {
        return a.pageNum - b.pageNum;
      });
      console.log("newImages", state.images);
    },
  },
});

export const { reset, setCover, setImages, sortImages } = bookSlice.actions;
