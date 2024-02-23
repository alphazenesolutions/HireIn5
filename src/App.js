/* eslint-disable eqeqeq */
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { persistor } from "./Store/Store";
import { PersistGate } from "redux-persist/integration/react";
import Layout from "./Layout/Layout";
import { storeAction } from "./Store/Store";

function App() {
  const dispatch = useDispatch();
  const isPopUp = useSelector((store) => {
    return store.isPopUp;
  });
  const CloseOverlay = () => {
    dispatch(storeAction.isPopUpHander());
  };
  return (
    <>
      <div className="App">
        <Router>
          <PersistGate loading={null} persistor={persistor}>
            {/* <Routing /> */}
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
      isPopUp == "reserveSuccess" ||
      isPopUp == "project" ? (
        <div onClick={CloseOverlay} id="overlay"></div>
      ) : null}
    </>
  );
}

export default App;
