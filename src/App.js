import { Provider } from "react-redux";
import "./App.css";
import Routing from "./Routing/Routing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Store, persistor } from "./Store/Store";
import { PersistGate } from "redux-persist/integration/react";
import Layout from "./Layout/Layout";

function App() {
  return (
    <div className="App">
      <Router>
        <Provider store={Store}>
          <PersistGate loading={null} persistor={persistor}>
            {/* <Routing /> */}
            <Layout />
          </PersistGate>
        </Provider>
      </Router>
    </div>
  );
}

export default App;
