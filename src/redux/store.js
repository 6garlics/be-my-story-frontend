import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { bookSlice } from "./bookSlice";
import { userSlice } from "./userSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [],
};

const reducers = combineReducers({
  book: bookSlice.reducer,
  user: userSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
