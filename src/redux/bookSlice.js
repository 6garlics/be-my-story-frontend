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
    bookId: -1,
    diaryId: -1,
    genre: "",
    date: "",
    title: "",
    texts: [],
    coverUrl: "",
    images: [],
    imageCnt: 0,
    saved: false,
  },
  reducers: {
    reset: (state, action) => {
      state.bookId = -1;
      state.diaryId = -1;
      state.genre = "";
      state.date = "";
      state.title = "";
      state.texts = [];
      state.coverUrl = "";
      state.images = Array.from({ length: 15 }, () => "");
      state.imageCnt = 0;
      state.saved = false;
    },
    setBookId: (state, action) => {
      state.bookId = action.payload;
    },
    setDiaryId: (state, action) => {
      state.diaryId = action.payload;
    },
    setGenre: (state, action) => {
      state.genre = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setTexts: (state, action) => {
      state.texts = action.payload;
    },
    setText: (state, action) => {
      state.texts[action.payload.index] = action.payload.text;
    },
    setCover: (state, action) => {
      state.coverUrl = action.payload;
    },
    setImages: (state, action) => {
      state.images = action.payload;
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
