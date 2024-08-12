import { useEffect, useRef, useState } from "react";
import "./VideoPage.css";
import {  useNavigate } from "react-router-dom";
import ActionButtons from "./ActionButtons";

import { useSocket } from "../../../../utils/context/SocketContext";
import { useWebRTC } from "../../../../utils/context/WebrtcContext";
import { RootState } from "../../../../utils/redux/app/store";
import { useSelector } from "react-redux";

const CallerVideo = () => {
  const remoteFeedEl = useRef<HTMLVideoElement | null>(null);
  const localFeedEl = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();
  const [offerCreated, setOfferCreated] = useState(false);
  const [answerCreated, setAnswerCreated] = useState(false);

  const { socket } = useSocket();
  const { peerConnection, remoteStream, localStream,callStatus,offerData } = useWebRTC();
  const manager = useSelector((state: RootState) => state.manager);
  const chat = useSelector((state: RootState) => state.chat);

  let reciver:any={};
  if(chat.data&&chat.data.users){
     reciver=chat.data.users.find((value)=>value._id !==manager.managerId)
  
  }
  useEffect(() => {
    if (!localStream)navigate(`/`);
     else {
      if (remoteFeedEl.current) {
        remoteFeedEl.current.srcObject = remoteStream;
      }
      if (localFeedEl.current) {
        localFeedEl.current.srcObject = localStream;
      }
    }
  }, []);
  useEffect(() => {
    const shareVideoAsync = async () => {
      if(peerConnection && peerConnection.signalingState === "stable"){

      const offer = await peerConnection.createOffer()
      peerConnection.setLocalDescription(offer);
      
      socket?.emit("newOffer", offer,manager.managerId,reciver);

      setOfferCreated(true);
      }
    };
    if (!offerCreated ) shareVideoAsync();
  }, [offerCreated,peerConnection,manager.managerId]);

  useEffect(() => {
    const addAnswerAsync = async () => {
      if(peerConnection && peerConnection.signalingState === "have-local-offer"){

        try {
          await peerConnection.setRemoteDescription(callStatus.answer);
        } catch (error) {
          console.error("Error setting remote description (answer):", error);
        }
      }
    };
    if (callStatus.answer) {
      addAnswerAsync();
    }
  }, [callStatus]);

  useEffect(() => {
    const addOfferAndCreateAnswerAsync = async () => {
      if(peerConnection && offerData && peerConnection.signalingState === "stable"){
        await peerConnection.setRemoteDescription(offerData.offer);

        const answer = await peerConnection.createAnswer();
        peerConnection.setLocalDescription(answer);
        const copyOfferData = { ...offerData };
        copyOfferData.answer = answer;
        copyOfferData.answerUserName = manager.managerId;
        setAnswerCreated(true);
  
        await socket?.emitWithAck("newAnswer", copyOfferData,manager.managerId);
      }
     
      
    };

    if (!answerCreated && offerData) {
      addOfferAndCreateAnswerAsync();
    }
  }, [answerCreated, offerData, peerConnection,manager.managerId]);

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
