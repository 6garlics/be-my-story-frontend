import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { bookSlice } from "./bookSlice";
import { userSlice } from "./userSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { timelineSlice } from "./timelineSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [],
};

const reducers = combineReducers({
  book: bookSlice.reducer,
  user: userSlice.reducer,
  timeline: timelineSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
