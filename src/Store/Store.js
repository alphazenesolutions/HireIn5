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
    issidebar: false,
    isPopUp: null,
    isPopUp2: false,
    bookmarkdata: [],
    userdata: [],
    loginrole: null,
    singleuser: [],
    onboarding_status: null,
    alluserdata: [],
    allcompanydata: [],
    searchuser: [],
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
    issidebarHandler(state, payload) {
      state.issidebar = payload.payload.issidebar;
    },
    isPopUpHander(state, action) {
      state.isPopUp = action.payload;
    },
    isPopUpHander2(state, action) {
      state.isPopUp2 = action.payload;
      console.log("hello");
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
    singleuserHander(state, action) {
      state.singleuser = action.payload.singleuser;
    },
    onboarding_statusHander(state, action) {
      state.onboarding_status = action.payload.onboarding_status;
    },
    alluserdataHander(state, action) {
      state.alluserdata = action.payload.alluserdata;
    },
    allcompanydataHander(state, action) {
      state.allcompanydata = action.payload.allcompanydata;
    },
    searchuserHander(state, action) {
      state.searchuser = action.payload.searchuser;
    },
  },
});

// Create a persisted reducer
const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "role",
    "userid",
    "islogin",
    "token",
    "signupdata",
    "loginrole",
    "onboarding_status",
    "issidebar",
    "userdata",
    "alluserdata",
    "singleuser",
    "allcompanydata",
    "searchuser",
    "bookmarkdata",
  ],
};

const persistedReducer = persistReducer(persistConfig, StoreSlice.reducer);
const Store = configureStore({
  reducer: persistedReducer,
});
export const storeAction = StoreSlice.actions;

const persistor = persistStore(Store);

export { Store, persistor };
