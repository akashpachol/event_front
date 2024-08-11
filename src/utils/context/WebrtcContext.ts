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
}

const WebRTCContext = createContext<WebRTCContextProps | null>(null);

export const useWebRTC = () => {
    return useContext(WebRTCContext);
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
      if (e.candidate) {
        socket?.emit("sendIceCandidateToSignalingServer", {
          iceCandidate: e.candidate,
          iceUserName: userName,
          didIOffer: typeOfCall === "offer",
        });
      }
    };

    pc.ontrack = (e) => {
      e.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };
  };

  useEffect(() => {
    if (peerConnection) {
      return () => {
        peerConnection.close();
      };
    }
  }, [peerConnection]);

  return (
    <WebRTCContext.provider>
      {children}
    </WebRTCContext.provider>
  );
};


