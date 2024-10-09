import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactPlayer from "react-player";

const AudioHighlightedText = ({ dataAudioJson, audioUrl }) => {
  const [segments, setSegments] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [highlightedText, setHighlightedText] = useState("");
  const [displayBtn, setDisplayBtn] = useState(false);
  const textContainerRef = useRef(null);

  useEffect(() => {
    const getAudioData = async () => {
      try {
        const res3 = await axios.get(dataAudioJson);
        console.log("dataAudioJson", res3.data);
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


  useEffect(() => {
    if (highlightedText !== "" && textContainerRef.current) { // si le  segment n' pas vide et le conteneur existe ?
      const spanElements = textContainerRef.current.querySelectorAll("span");

      const segmentElement = Array.from(spanElements).find((span) =>
        span.textContent.includes(highlightedText) // return le span qui a le même contenu que le "segment encours de lecture"
      );

      if (segmentElement) {
        const rect = segmentElement.getBoundingClientRect(); // coordonnés de l'elt

        if (
          (rect.top < 0) ||
          (rect.bottom > textContainerRef.current.offsetHeight)
        ) {
          segmentElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, [highlightedText]);


  const handleDownloadAudio = async () => {
    try {
      const response = await axios.get(audioUrl, {
        responseType: "blob",
      });
      console.log("response", response);
      const url = URL.createObjectURL(response.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = "audio.mp3";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        border: "1px solid #ddd",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        textAlign: "justify",
        height: "300px",
        overflowY: "scroll",
      }}
    >
      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <ReactPlayer
          url={audioUrl}
          light={true}
          playing={false}
          onClickPreview={(e) => setDisplayBtn(true)}
          onPlay={() => setCurrentTime(0)}
          onProgress={(state) => {
            setCurrentTime(state.playedSeconds);
          }}
          onError={(e) => console.log("onError Audio", e)}
          controls
          height={60}
          width="100%"
        />
        {displayBtn ? (
          <button
            style={{
              backgroundColor: "rgb(69, 64, 64)",
              color: "white",
              marginTop: "20px",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={handleDownloadAudio}
          >
            Dowload audio
          </button>
        ) : null}
      </div>
      <div
        ref={textContainerRef}
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
                segment.text === highlightedText ? "gray" : "transparent",
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
