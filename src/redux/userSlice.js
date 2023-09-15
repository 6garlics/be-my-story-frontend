import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: { userName: "", profileImg: "" },
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload.userName;
    },
    setProfileImg: (state, action) => {
      state.profileImg = action.payload.profileImg;
    },
  },
});

export const { setUserName, setProfileImg } = userSlice.actions;
