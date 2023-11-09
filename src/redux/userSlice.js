import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: { userName: "", profileImg: "", refresh: true },
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload.userName;
    },
    setProfileImg: (state, action) => {
      state.profileImg = action.payload.profileImg;
    },
    setRefresh: (state, action) => {
      state.refresh = !state.refresh;
    },
  },
});

export const { setUserName, setProfileImg } = userSlice.actions;
