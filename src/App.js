import { Provider, useDispatch, useSelector } from "react-redux";
import "./App.css";
import Routing from "./Routing/Routing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
      {isPopUp && <div onClick={CloseOverlay} id="overlay"></div>}
    </>
  );
}

export default App;
