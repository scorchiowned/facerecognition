import React, { useEffect, useRef } from "react";
import "./App.css";
import * as faceapi from "face-api.js";
import { loadModels, startVideoPlayer } from "./utils";

const appStyle = {
  width: "100%",
  height: 560,
  position: "relative"
};

const playEvent = props => {
  const { target } = props;
  const displaySize = { width: target.width, height: target.height };

  const canvas = faceapi.createCanvasFromMedia(target);
  canvas.setAttribute("style", "top:0;left:0;position:absolute;");
  document.getElementById("app").append(canvas);

  faceapi.matchDimensions(canvas, displaySize);
  setInterval(async () => {
    let detections = await faceapi
      .detectAllFaces(target, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptors()
      .withFaceExpressions();

    const resizeDetections = await faceapi.resizeResults(
      detections,
      displaySize
    );

    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizeDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizeDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizeDetections);
  }, 100);
};

function App() {
  let ref = useRef(null);

  useEffect(() => {
    loadModels(startVideoPlayer(ref));
    !!ref.current && ref.current.addEventListener("play", playEvent);
  }, [ref]);

  return (
    <div id={"app"} style={appStyle}>
      <video
        ref={ref}
        id="video"
        width={720}
        height={560}
        autoPlay={true}
        muted={true}
      ></video>
    </div>
  );
}

export default App;
