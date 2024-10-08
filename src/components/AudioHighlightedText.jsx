import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import ReactPlayer from "react-player";



const AudioHighlightedText = () => {
  const [segments, setSegments] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [highlightedText, setHighlightedText] = useState("");

  useEffect(() => {
    const getAudioData = async () => {
      try {
        const res3 = await axios.get(
          "https://all-in-one-backend-j2le.onrender.com/get-json"
        );
       // console.log("dataAudioJson", res3.data);
        setSegments(res3.data.segments);
      } catch (error) {
        console.log("error", error);
      }
    };
    getAudioData();
  }, []);

  useEffect(() => {
    if (segments.length > 0) {
      const currentSegment = segments.find(
        (segment) => segment.start <= currentTime && segment.end >= currentTime
      );
      setHighlightedText(currentSegment ? currentSegment.text : "");
    }
  }, [segments, currentTime]);

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        border: "1px solid #ddd",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <ReactPlayer
          url={"https://all-in-one-backend-j2le.onrender.com/get-audio"}
          playing={true}
          onProgress={(state) => {
            setCurrentTime(state.playedSeconds);
          }}
          controls
          height={60}
        />
      </div>
      <div
        style={{
          fontSize: "18px",
          lineHeight: "1.5",
        }}
      >
        {segments.map((segment, index) => (
          <span
            key={index}
            style={{
              padding: "5px",
              borderRadius: "5px",
             // transition: "background-color 0.1s ease-in-out",
              backgroundColor:
                segment.text === highlightedText ? "yellow" : "transparent",
            }}
          >
            {segment.text}{" "}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AudioHighlightedText;
