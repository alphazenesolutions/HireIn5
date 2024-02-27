/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { persistor } from "./Store/Store";
import { PersistGate } from "redux-persist/integration/react";
import Layout from "./Layout/Layout";
import { storeAction } from "./Store/Store";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const userid = useSelector((store) => store.userid);
  const token = useSelector((store) => store.token);
  const dispatch = useDispatch();
  const isPopUp = useSelector((store) => {
    return store.isPopUp;
  });
  const CloseOverlay = () => {
    dispatch(storeAction.isPopUpHander());
  };
  useEffect(() => {
    Getuserinfo();
  }, [token, userid]);
  const Getuserinfo = async () => {
    if (token !== null && userid !== null) {
      var userinfo = await axios
        .get(`${process.env.REACT_APP_LOCAL_HOST_URL}/user/update/${userid}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return err.response.data;
        });
      if (userinfo.id !== undefined) {
        dispatch(storeAction.userdataHander({ userdata: [userinfo] }));
      }
    }
  };
  return (
    <>
      <div className="App">
        <Router>
          <PersistGate loading={null} persistor={persistor}>
            <Layout />
          </PersistGate>
        </Router>
      </div>
      {isPopUp == "video" ||
      isPopUp == "personal" ||
      isPopUp == "professional" ||
      isPopUp == "Experience" ||
      isPopUp == "education" ||
      isPopUp == "certificate" ||
      isPopUp == "travel" ||
      isPopUp == "reserve" ||
      isPopUp == "filter" ||
      isPopUp == "monthly" ||
      isPopUp == "reserveSuccess" ||
      isPopUp == "project" ? (
        <div onClick={CloseOverlay} id="overlay"></div>
      ) : null}
    </>
  );
}

export default App;
