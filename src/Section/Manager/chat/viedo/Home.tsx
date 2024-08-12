import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../../../../utils/redux/app/store";
import { useSocket } from "../../../../utils/context/SocketContext";
import { useWebRTC } from "../../../../utils/context/WebrtcContext";
import { Modal } from "@mui/material";
import { IoVideocamOutline } from "react-icons/io5";
const Home: React.FC = () => {
  const [typeOfCall, setTypeOfCall] = useState<string>("");
  const [availableCalls, setAvailableCalls] = useState([]);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const {
    peerConnection,
    remoteStream,
    localStream,
    setLocalStream,
    callStatus,
    updateCallStatus,
    setOfferData,
    initializePeerConnection,
    clientSocketListeners,
  } = useWebRTC();
  const manager = useSelector((state: RootState) => state.manager);
  const { socket } = useSocket();

  const [currentCall, setCurrentCall] = useState(null);

  const initCall = async (typeOfCall: string) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setLocalStream(stream);
    setTypeOfCall(typeOfCall);
  };

  useEffect(() => {
    socket?.on("availableOffers", (data) => {
      console.log("gggggggggggggggg", data);

      setAvailableCalls(data);
    });
  }, [socket, availableCalls, setAvailableCalls]);

  useEffect(() => {
    if (localStream && !peerConnection && manager.managerId)
      initializePeerConnection(manager.managerId, typeOfCall);
  }, [localStream]);

  useEffect(() => {
    if (typeOfCall && peerConnection) {
      clientSocketListeners(
        socket,
        typeOfCall,
        callStatus,
        updateCallStatus,
        peerConnection
      );
    }
  }, [typeOfCall, peerConnection]);

  useEffect(() => {
    if (remoteStream && peerConnection) navigate(`/manager/viedoCall`);
  }, [remoteStream, peerConnection]);

  const call = async () => {
    initCall("incoming");
  };

  const answer = (callData: any) => {
    initCall("answer");
    setOfferData(callData);
  };

  useEffect(() => {
    if (availableCalls.length > 0) {
      setCurrentCall(availableCalls[0]); 
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [availableCalls]);

  const handleClose = () => {
    setOpen(false);
    setCurrentCall(null);
  };

  return (
    <>
      <div className="row">
    
       
          <button onClick={call} className="btn  hang-up">
          <IoVideocamOutline className="text-primary w-8 h-8" />
          </button>
     
        <div className="">
          {currentCall && (
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div>
                <div className="min-h-screen flex  justify-center items-center">
                  <div className="bg-white flex w-1/3  flex-col justify-center items-center p-6">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <IoVideocamOutline className="text-primary w-12 h-12" />
                      <h2 className="text-2xl font-bold">
                        Incoming Video Call
                      </h2>
                      <div className="flex items-center gap-4">
                        <div className="border-2 border-primary">
                          <img
                            className="w-10 h-10 rounded-full border-0"
                            src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
                            alt="Rounded avatar"
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-medium">John Doe</p>
                          <p className="text-muted-foreground">Calling...</p>
                        </div>
                      </div>
                      <div className="flex gap-4 w-full">
                        <button
                          onClick={handleClose}
                          className="flex-1 bg-gradient-to-r text-white from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => {
                            answer(currentCall);
                            handleClose();
                          }}
                          className="flex-1 bg-gradient-to-r  text-white from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                          Accept
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
