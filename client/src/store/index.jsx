import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import navigationSlice from "./navigate-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    navigate: navigationSlice.reducer,

  },
});

export default store;
//export store to connet it to react app