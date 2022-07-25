import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  log: null
}

export const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    addLog: (state, action) => {
      state.log = action.payload
    }
  }
})

export const {addLog} = logSlice.actions;
export const getCurrentLog = (state) => state.log.log;
export default logSlice.reducer;
