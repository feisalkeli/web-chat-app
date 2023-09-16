///implement socket context

import React, { useState, createContext, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();
//create the server
const socket = io("http://localhost:5000/");

const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState("");
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  const myVideo = useRef();

  console.log(`myVideo`, myVideo);
  useEffect(() => {
    ///get audio and video permission as soon as the component mounts
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      //returns a promise
      .then((currentStream) => {
        setStream(currentStream); //update state with stream
      });
    //get specific id from back-end
    socket.on("me", (id) => setMe(id));

    socket.on(
      "calluser",
      /*Destructure the data object*/ ({ from, name: callerName, signal }) => {
        setCall({ isReceivedCall: true, from, name: callerName, signal });
      }
    );
  }, []);
  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("answercall", { signal: data, to: call.from });
    });
  };

  const callUser = () => {};
  const leaveCall = () => {};
};
