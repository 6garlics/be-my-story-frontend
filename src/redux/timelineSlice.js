import { createSlice } from "@reduxjs/toolkit";

export const timelineSlice = createSlice({
  name: "timelineSlice",
  initialState: {
    page: 0,
    savedPage: -1,
    index: 0,
    bookList: [],
  },
  reducers: {
    reset: (state, action) => {
      state.page = 0;
      state.savedPage = -1;
      state.index = 0;
      state.bookList = [];
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSavedPage: (state, action) => {
      state.savedPage = action.payload;
    },
    setIndex: (state, action) => {
      state.index = action.payload;
    },
    setBookList: (state, action) => {
      state.bookList = action.payload;
    },
  },
});
