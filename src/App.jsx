import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomeHome from "./components/HomeHome/HomeHome";



const App = () => {
  return (
        <Routes>
        <Route path="/" element={<Navigate replace to="/home"  />} />  
        <Route path="/home" element={<HomeHome />} />
      </Routes>
  );
};

export default App;
