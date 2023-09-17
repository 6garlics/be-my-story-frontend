import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AIclient from "../api/AIclient";

export const thunkCreateCover = createAsyncThunk(
  "bookSlice/fetchBookCover",
  async (body) => {
    const res = await AIclient.post(`/cover`, body, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("cover", res.data);
    return res.data;
  }
);

export const thunkCreateImage = createAsyncThunk(
  "bookSlice/thunkCreateImage",
  async ({ pageNum, body }) => {
    const res = await AIclient.post(`/textToImage/${pageNum}`, body, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(res.data);
    return { imgUrl: res.data.imgUrl, pageNum: pageNum };
  }
);

export const bookSlice = createSlice({
  name: "bookSlice",
  initialState: { coverUrl: "", images: [] },
  reducers: {
    reset: (state, action) => {
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
  extraReducers: (builder) => {
    builder.addCase(thunkCreateCover.fulfilled, (state, action) => {
      state.coverUrl = action.payload.coverUrl;
    });
    builder.addCase(thunkCreateImage.fulfilled, (state, action) => {
      state.images[action.payload.pageNum] = action.payload.imgUrl;
    });
  },
});

export const { reset, setCover, setImages, sortImages } = bookSlice.actions;
