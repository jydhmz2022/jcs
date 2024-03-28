// import { createSlice } from "@reduxjs/toolkit";

// export const languageSlice = createSlice({
//   name: "language",
//   initialState: {
//     currentLanguage: "fr",
//   },
//   reducers: {
//     setLanguage: (state, action) => {
//       state.currentLanguage = action.payload;
//     },  
//   },
// });

// export const { setLanguage } = languageSlice.actions;

// export default languageSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const languageSlice = createSlice({
  name: "language",
  initialState: {
    currentLanguage: "fr",
  },
  reducers: {
    setLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;

