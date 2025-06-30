import { BrowserRouter as Router, Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import "./assets/css/animate.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/style.css";
import "./App.css"
import "./assets/plugins/fontawesome/css/all.min.css";
import "./assets/plugins/tabler-icons/tabler-icons.css"
import { OPRoutes } from "./OPRoutes";
import { useSelector } from "react-redux";

function App() {
  const l_Route = OPRoutes();
  const getAppStoreData = useSelector((state) => state.appstate.login_info);
  console.log(process.env.REACT_APP_IP_ADDRESS);
  return (
    <>
      <Routes>
        {l_Route.map((item) => {
          return (
            <Route
              key={item.path}
              path={item.path}
              element={
                item.isloggedin ? (getAppStoreData.isloggedin ? (item.element) : (
                  <Navigate to="/" />
                )
                ) : (item.element)
              }
            />
          );
        })}

      </Routes>
    </>
  );
}

export default App;
