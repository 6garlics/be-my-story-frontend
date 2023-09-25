import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AIclient from "../api/AIclient";
import { postBook } from "../api/books";

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
  async ({ pageNum, body, dispatch }) => {
    const res = await AIclient.post(`/textToImage/${pageNum}`, body, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(res.data);
    return { imgUrl: res.data.imgUrl, pageNum: pageNum, dispatch: dispatch };
  }
);

/*
export const thunkSaveBook = createAsyncThunk(
  "bookSlice/thunkSaveBook",
  async (body) => {
    const bookData = await postBook(body);
    console.log(bookData);
    return bookData.bookId;
  }
);
*/

export const bookSlice = createSlice({
  name: "bookSlice",
  initialState: {
    bookId: "",
    diaryId: 75,
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
      state.bookId = "";
      state.diaryId = 75;
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
      //만약 동화책이 완성됐지만 아직 저장이 안된 상태라면
      /*
      if (
        state.title &&
        state.texts.length !== 0 &&
        state.imageCnt === state.texts.length &&
        !state.saved
      ) {
        const body = {
          diaryId: state.diaryId,
          title: state.title,
          genre: state.genre,
          coverUrl: state.coverUrl,
          date: state.date,
          pages: state.texts.map((text, index) => ({
            text: text,
            imgUrl: state.images[index],
            x: 0,
            y: 0,
          })),
        };
        thunkSaveBook(body); //최초 동화책 저장
        state.saved = true; //저장됐다고 표시
      }
      */
    });
    /*
    builder.addCase(thunkSaveBook.fulfilled, (state, action) => {
      state.bookId = action.payload;
    });
    */
  },
});

export const {
  reset,
  setGenre,
  setDate,
  setCover,
  setImages,
  sortImages,
  setSaved,
} = bookSlice.actions;
