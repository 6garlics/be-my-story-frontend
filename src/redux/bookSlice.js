import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createCover, createImage, createTexts } from "../api/AIbooks";

export const thunkCreateTexts = createAsyncThunk(
  "bookSlice/fetchBookTexts",
  async (body) => {
    const data = await createTexts(body);
    return data;
  }
);

export const thunkCreateCover = createAsyncThunk(
  "bookSlice/fetchBookCover",
  async (body) => {
    const data = await createCover(body);
    return data;
  }
);

export const thunkCreateImage = createAsyncThunk(
  "bookSlice/thunkCreateImage",
  async ({ pageNum, body }) => {
    const data = await createImage(pageNum, body);
    return { imgUrl: data.imgUrl, pageNum: pageNum };
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
    titleX: 0,
    titleY: 0,
    coverUrl: "",
    pages: [],
    length: 0,
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
      state.titleX = 0;
      state.titleY = 0;
      state.coverUrl = "";
      state.pages = Array.from({ length: 15 }, () => ({
        text: "",
        imgUrl: "",
        x: 0,
        y: 0,
      }));
      state.length = 0;
      state.imageCnt = 0;
      state.saved = false;
    },
    setEnter: (state, action) => {
      state.pages = state.pages.map((page) => page.text.replace("\n", "<br>"));
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
    setTitleX: (state, action) => {
      state.titleX = action.payload;
    },
    setTitleY: (state, action) => {
      state.titleY = action.payload;
    },
    setCover: (state, action) => {
      state.coverUrl = action.payload;
    },
    setPages: (state, action) => {
      state.pages = action.payload;
    },
    setLength: (state, action) => {
      state.length = action.payload;
    },
    setText: (state, action) => {
      state.pages[action.payload.index].text = action.payload.text;
    },
    setSaved: (state, action) => {
      state.saved = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(thunkCreateTexts.fulfilled, (state, action) => {
      state.title = action.payload.title;
      action.payload.texts.forEach((text, index) => {
        state.pages[index].text = text;
      });
      state.length = action.payload.texts.length;
    });
    builder.addCase(thunkCreateCover.fulfilled, (state, action) => {
      state.coverUrl = action.payload.coverUrl;
    });
    builder.addCase(thunkCreateImage.fulfilled, (state, action) => {
      state.pages[action.payload.pageNum].imgUrl = action.payload.imgUrl;
      state.imageCnt++;
    });
  },
});
