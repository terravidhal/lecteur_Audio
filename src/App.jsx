import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AudioHighlightedText from "./components/AudioHighlightedText";



const App = () => {
  return (
        <Routes>
        <Route path="/" element={<Navigate replace to="/home"  />} />  
        <Route path="/home" element={<AudioHighlightedText />} />
      </Routes>
  );
};

export default App;
