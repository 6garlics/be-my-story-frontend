import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AIclient from "../api/AIclient";

export const thunkCreateTexts = createAsyncThunk(
  "bookSlice/fetchBookTexts",
  async (body) => {
    const res = await AIclient.post(`/diaryToStory`, body, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("textsData", res.data);
    return res.data;
  }
);

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
  initialState: {
    title: "",
    texts: [],
    coverUrl: "",
    images: [],
    imageCnt: 0,
    saved: false,
  },
  reducers: {
    reset: (state, action) => {
      state.title = "";
      state.texts = [];
      state.coverUrl = "";
      state.images = Array.from({ length: 15 }, () => "");
      state.imageCnt = 0;
      state.saved = false;
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
    setSaved: (state, action) => {
      state.saved = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(thunkCreateTexts.fulfilled, (state, action) => {
      state.title = action.payload.title;
      state.texts = action.payload.texts;
    });
    builder.addCase(thunkCreateCover.fulfilled, (state, action) => {
      state.coverUrl = action.payload.coverUrl;
    });
    builder.addCase(thunkCreateImage.fulfilled, (state, action) => {
      state.images[action.payload.pageNum] = action.payload.imgUrl;
      state.imageCnt++;
    });
  },
});

export const { reset, setCover, setImages, sortImages, setSaved } =
  bookSlice.actions;
