import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSocket } from "./SocketContext";

interface WebRTCContextProps {
  peerConnection: RTCPeerConnection | null;
  setPeerConnection: React.Dispatch<React.SetStateAction<RTCPeerConnection | null>>;
  remoteStream: MediaStream | null;
  setRemoteStream: React.Dispatch<React.SetStateAction<MediaStream | null>>;
  localStream: MediaStream | null;
  setLocalStream: React.Dispatch<React.SetStateAction<MediaStream | null>>;
  callStatus: Record<string, any>;
  updateCallStatus: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  offerData: any;
  setOfferData: React.Dispatch<React.SetStateAction<any>>;
  initializePeerConnection: (userName: string, typeOfCall: string) => void;
  clientSocketListeners: (socket: SocketIOClient.Socket, typeOfCall: string, callStatus: Record<string, any>, updateCallStatus: React.Dispatch<React.SetStateAction<Record<string, any>>>, peerConnection: RTCPeerConnection | null) => void;
}

const WebRTCContext = createContext<WebRTCContextProps | null>(null);

export const useWebRTC = () => {
  const context = useContext(WebRTCContext);
  if (!context) {
    throw new Error("useWebRTC must be used within a WebRTCProvider");
  }
  return context;
};

interface WebRTCProviderProps {
  children: ReactNode;
}

export const WebRTCProvider: React.FC<WebRTCProviderProps> = ({ children }) => {
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [callStatus, updateCallStatus] = useState<Record<string, any>>({});
  const [offerData, setOfferData] = useState<any>(null);
  const { socket } = useSocket();

  const initializePeerConnection = (userName: string, typeOfCall: string) => {
    const pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            'stun:stun.l.google.com:19302',
            'stun:stun1.l.google.com:19302'
          ]
        }
      ]
    });

    setPeerConnection(pc);

    const remoteStream = new MediaStream();
    setRemoteStream(remoteStream);

    if (localStream) {
      localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
      });
    }

    pc.onicecandidate = (e) => {
      console.log('found');
      
      if (e.candidate) {
        socket?.emit("sendIceCandidateToSignalingServer", {
          iceCandidate: e.candidate,
          iceUserId: userName,
          didIOffer: typeOfCall === "incoming",
        });
      }
    };

    pc.ontrack = (e) => {
      console.log('track');
      
      e.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
      console.log('viedo stream');
      
    };
  };

  

  
const clientSocketListeners = ( socket: SocketIOClient.Socket,
  typeOfCall: string,
  callStatus: Record<string, any>,
  updateCallStatus: React.Dispatch<React.SetStateAction<Record<string, any>>>,
  peerConnection: RTCPeerConnection | null)=>{
      
  socket.on('answerResponse',(entireOfferObj:any)=>{
      console.log(entireOfferObj,'entireOfferObj',callStatus);
      const copyCallStatus = {...callStatus}
      copyCallStatus.answer = entireOfferObj.answer
      copyCallStatus.myRole = typeOfCall
      console.log('entireOfferObj',copyCallStatus);

      updateCallStatus(copyCallStatus)
  })

  socket.on('receivedIceCandidateFromServer',(iceC:any)=>{
      console.log("soket");
      
      if(iceC){
        if(peerConnection)
          peerConnection.addIceCandidate(iceC);
          

          console.log("Added an iceCandidate to existing page presence")
          // setShowCallInfo(false);
      }
  })
  
}

  useEffect(() => {
    return () => {
      if (peerConnection) {
        peerConnection.close();
      }
    };
  }, [peerConnection]);

  return (
    <WebRTCContext.Provider
      value={{
        peerConnection,
        setPeerConnection,
        remoteStream,
        setRemoteStream,
        localStream,
        setLocalStream,
        callStatus,
        updateCallStatus,
        offerData,
        setOfferData,
        initializePeerConnection,
        clientSocketListeners
      }}
    >
      {children}
    </WebRTCContext.Provider>
  );
};
