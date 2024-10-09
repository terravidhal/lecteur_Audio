import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AudioHighlightedText from "./components/AudioHighlightedText";



const App = () => {
  const dataAudioJson = "https://all-in-one-backend-j2le.onrender.com/get-json";
  const audioUrl = "https://all-in-one-backend-j2le.onrender.com/get-audio";

  return (
        <Routes>
        <Route path="/" element={<Navigate replace to="/home"  />} />  
        <Route path="/home" element={<AudioHighlightedText dataAudioJson={dataAudioJson} audioUrl={audioUrl} />} />
      </Routes>
  );
};

export default App;
