import { useEffect, useRef, useState } from "react";
import "./VideoPage.css";
import {  useNavigate } from "react-router-dom";
import socketConnection from "../webrtcUtilities/socketConnection";
import ActionButtons from "./ActionButtons";
import { useSelector } from "react-redux";
import { useWebRTC } from "../redux/context";

const AnswerVideo = () => {
  const remoteFeedEl = useRef(null); 
  const localFeedEl = useRef(null); 
  const navigate = useNavigate();
  const videoData = useSelector((state) => state.video); 
  const { peerConnection, remoteStream, localStream,offerData } = useWebRTC();

  const [answerCreated, setOfferCreated] = useState(false);

  useEffect(() => {
    if (!localStream) {
      navigate(`/`);
    } else {
      remoteFeedEl.current.srcObject = remoteStream;
      localFeedEl.current.srcObject = localStream;
    }
  }, []);

  useEffect(() => {
    const addOfferAndCreateAnswerAsync = async () => {
      await peerConnection.setRemoteDescription(offerData.offer);

      const answer = await peerConnection.createAnswer();
      peerConnection.setLocalDescription(answer);
      const copyOfferData = { ...offerData };
      copyOfferData.answer = answer;
      copyOfferData.answerUserName = videoData.userName;
      setOfferCreated(true);

      const socket = socketConnection(videoData.userName);
      await socket.emitWithAck("newAnswer", copyOfferData);
      
    };

    if (!answerCreated) {
      addOfferAndCreateAnswerAsync();
    }
  }, [answerCreated]);

  return (
    <div>
      <div className="videos">
        <video
          id="local-feed"
          ref={localFeedEl}
          autoPlay
          controls
          playsInline
        ></video>
        <video
          id="remote-feed"
          ref={remoteFeedEl}
          autoPlay
          controls
          playsInline
        ></video>
      </div>

      <ActionButtons localStream={localStream} />
    </div>
  );
};

export default AnswerVideo;
