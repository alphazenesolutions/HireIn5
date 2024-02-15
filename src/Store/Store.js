// store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

// Define your slice
const StoreSlice = createSlice({
  name: "HireIn5",
  initialState: {
    role: null,
    signupdata: null,
    token: null,
    userid: null,
    islogin: false,
    isPopUp: null,
  },
  reducers: {
    roleHandler(state, payload) {
      state.role = payload.payload.role;
    },
    signupdataHandler(state, payload) {
      state.signupdata = payload.payload.signupdata;
    },
    tokenHandler(state, payload) {
      state.token = payload.payload.token;
    },
    useridHandler(state, payload) {
      state.userid = payload.payload.userid;
    },
    isloginHandler(state, payload) {
      state.islogin = payload.payload.islogin;
    },
    isPopUpHander(state, action) {
      state.isPopUp = action.payload;
    },
    // isPopUpHander1(state) {
    //   state.isPopUp1 = !state.isPopUp1;
    // },
    // isPopUpHander2(state) {
    //   state.isPopUp2 = !state.isPopUp2;
    // },
  },
});

// Create a persisted reducer
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["role", "userid", "islogin", "token", "signupdata"],
};

const persistedReducer = persistReducer(persistConfig, StoreSlice.reducer);
const Store = configureStore({
  reducer: persistedReducer,
});
export const storeAction = StoreSlice.actions;

const persistor = persistStore(Store);

export { Store, persistor };
