import * as faceapi from "face-api.js";

export const loadModels = callback => {
  return Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
    faceapi.nets.faceExpressionNet.loadFromUri("/models")
  ]).then(callback);
};

export const startVideoPlayer = divRef => {
  window.navigator.getUserMedia(
    { video: {} },
    stream => (divRef.current.srcObject = stream),
    err => console.error(err)
  );
};
