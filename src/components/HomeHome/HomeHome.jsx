import React, { useRef, useState } from "react";
import { Box, Skeleton } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import ReactPlayer from "react-player";

const HomeHome = () => {
  const [segments, setSegments] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [fullText, setFullText] = useState("");
  const [highlightedText, setHighlightedText] = useState("");

  const {
    error,
    data: allFields,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["dataAudio"],
    queryFn: async () => {
      const res1 = await axios.get(
        "https://all-in-one-backend-j2le.onrender.com"
      );
      const res2 = await axios.get(
        "https://all-in-one-backend-j2le.onrender.com/get-audio"
      );
      const res3 = await axios.get(
        "https://all-in-one-backend-j2le.onrender.com/get-json"
      );
      setSegments(res3.data.segments);
      setFullText(res3.data.text);
      return res1;
    },
    //staleTime: 2000,
  });

  /*if (isLoading) {
    return <div>loading...</div>
  }*/

  if (isError) return console.log("An error has occurred: ", error.message);

  const parseSegments = (segments) => {
    return segments.map((segment) => ({
      text: segment.text,
      startTime: segment.start,
      endTime: segment.end,
    }));
  };

  const getCurrentSegment = (segments, currentTime) => {
    return segments.find(
      (segment) =>
        segment.startTime <= currentTime && segment.endTime >= currentTime
    );
  };


  const highlightText = (segments, currentTime) => {
    const currentSegment = getCurrentSegment(segments, currentTime);
    if (currentSegment) {
      setHighlightedText(currentSegment.text);
    } else {
      setHighlightedText("");
    }
  };

  useEffect(() => {
    if (segments.length > 0) {
      const parsedSegments = parseSegments(segments);
      highlightText(parsedSegments, currentTime);
    }
  }, [segments, currentTime]);

  return (
    <Box backgroundColor="#f5f5f5" className="HomeHome">
      <Box
        className="current-button"
        display="flex"
        justifyContent="space-between"
        alignItems="end"
        paddingRight="20px"
      >
        <Box
          padding="10px 20px"
          fontWeight="700"
          fontSize="1.4rem"
          color="#000000"
          className="title-home"
        >
          Fields
        </Box>
      </Box>
      <Box
        className="current-link"
        display="flex"
        flexDirection="row"
        alignItems="center"
        gap="3px"
        height="16px"
        marginLeft="20px"
        marginBottom="20px"
      >
        <Box className="current1" display="flex" gap="2px" alignItems="center">
          <Box className="current-img">
            <img src="/assets/images/dashboard_gray.svg" alt="" />
          </Box>
          <Box
            className="current-name"
            fontWeight="400"
            fontSize="0.8rem"
            color="#bdbdbd"
          >
            Dashboard /
          </Box>
        </Box>
        <Box
          className="current2"
          fontWeight="400"
          fontSize="0.8rem"
          color="#05253a"
        >
          fields
        </Box>
      </Box>
      <Box
        boxSizing="border-box"
        padding="27px 20px"
        margin="0 20px 10px 20px"
        background="#ffffff"
        border="1px solid #e9ebf8"
        borderRadius="8px"
        className="home-courses"
      >
        <Box
          className="courses-items"
          gap="20px;"
          display="grid;"
          gridTemplateColumns={{
            base: "1fr;",
            sm: "1fr 1fr;",
            md: "1fr 1fr;",
            lg: "1fr 1fr 1fr;",
            xl: "1fr 1fr 1fr;",
          }}
        >
          <ReactPlayer
            url={"https://all-in-one-backend-j2le.onrender.com/get-audio"}
            playing={true}
            onProgress={(state) => {
              setCurrentTime(state.playedSeconds);
            }}
            controls
          />
          <div>
            {fullText.split(" ").map((word, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: highlightedText.includes(word)
                    ? "yellow"
                    : "transparent",
                }}
              >
                {word}{" "}
              </span>
            ))}
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeHome;
