import { useEffect, useRef, useState } from "react";
import "./VideoPage.css";
import {  useNavigate } from "react-router-dom";
import socketConnection from "../webrtcUtilities/socketConnection";
import ActionButtons from "./ActionButtons";
import { useSelector } from "react-redux";
import { useWebRTC } from "../redux/context";

const CallerVideo = () => {
  const remoteFeedEl = useRef(null);
  const localFeedEl = useRef(null);
  const navigate = useNavigate();
  const [offerCreated, setOfferCreated] = useState(false);
  const videoData = useSelector((state) => state.video);  
  const { peerConnection, remoteStream, localStream,callStatus } = useWebRTC();

  useEffect(() => {
    if (!localStream)navigate(`/`);
     else {
      remoteFeedEl.current.srcObject = remoteStream;
      localFeedEl.current.srcObject = localStream;
    }
  }, []);
  useEffect(() => {
    const shareVideoAsync = async () => {
      const offer = await peerConnection.createOffer()
      peerConnection.setLocalDescription(offer);
      const socket = socketConnection(videoData.userName);
      console.log(offer,'offer');
      
      socket.emit("newOffer", offer);

      setOfferCreated(true);
    };
    if (!offerCreated) shareVideoAsync();
  }, [offerCreated]);

  useEffect(() => {
    const addAnswerAsync = async () => {
      await peerConnection.setRemoteDescription(callStatus.answer);
    };
    if (callStatus.answer) {
      addAnswerAsync();
    }
  }, [callStatus]);

  return (
    <div>
      <div className="videos">
        <video id="local-feed"ref={localFeedEl} autoPlay controls playsInline></video>
        <video id="remote-feed" ref={remoteFeedEl} autoPlay controls playsInline ></video>
      </div>

      <ActionButtons localStream={localStream} />
    </div>
  );
};

export default CallerVideo;
