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
    bookmarkdata: [],
    userdata: [],
    loginrole: null,
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
    bookmarkdataHander(state, action) {
      state.bookmarkdata = action.payload.bookmarkdata;
    },
    userdataHander(state, action) {
      state.userdata = action.payload.userdata;
    },
    loginroleHander(state, action) {
      state.loginrole = action.payload.loginrole;
    },
  },
});

// Create a persisted reducer
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["role", "userid", "islogin", "token", "signupdata", "loginrole"],
};

const persistedReducer = persistReducer(persistConfig, StoreSlice.reducer);
const Store = configureStore({
  reducer: persistedReducer,
});
export const storeAction = StoreSlice.actions;

const persistor = persistStore(Store);

export { Store, persistor };
