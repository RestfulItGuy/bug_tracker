import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers:{
    login: (state, action) => {
      state.currentUser = action.payload
    },
    logout: (state) => {
      state.currentUser = null
    }
  }
})

export const {login, logout} = userSlice.actions;
export const selectCurrentUser = (state) => state.user.currentUser; //Links to the current user state data
export default userSlice.reducer;