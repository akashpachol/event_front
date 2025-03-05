import React, { useEffect, useState } from "react";
import { IoVideocamOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../utils/redux/app/store";
import { useSocket } from "../../../../utils/context/SocketContext";
import ModalViedo from "./Modal";
import { userDataTypes } from "../../../../utils/types";

const Viedo: React.FC = () => {
  const [open, setOpen] = useState(false);

  const [videoCallJoinRoomId, setVideoCallJoinRoomId] = useState("");

  const navigate = useNavigate();
  const vender = useSelector((state: RootState) => state.vender);
  const chat = useSelector((state: RootState) => state.chat);
  const { socket } = useSocket();

  let reciver: userDataTypes|undefined ;
  if (chat.data && chat.data.users) {
    reciver = chat.data.users.find((value) => value._id !== vender.venderId);
  }
  
  function randomID(len: number) {
    let result = "";
    if (result) return result;
    const chars =
        "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJL",
      maxPos = chars.length;
    len = len || 5;
    for (let i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }

  const handleVideoCall = () => {
    const roomId = randomID(10);
    const receiverId = reciver?._id;
    const emitData = {
      senderId: vender.venderId,
      senderName: vender.vender,
      senderProfile: vender.vender,
      receiverId,
      roomId: roomId,
    };
    socket?.emit("videoCallRequest", emitData);
    navigate(`/vender/video-call/${roomId}/${vender.venderId}`);
  };

  useEffect(() => {
    socket?.on("videoCallResponse", (data) => {
      console.log("videoCallResponse", data);
      setVideoCallJoinRoomId(data.roomId);
 
      setOpen(true);
    });


    socket?.on('call-cancelled', () => {
      setOpen(false);
    });
  }, [socket]);

  const handleJoinVidoCallRoom = () => {

    navigate(`/vender/video-call/${videoCallJoinRoomId}/${vender.venderId}`);
  };

  return (
    <div>
      <button onClick={handleVideoCall} className="btn  hang-up">
        <IoVideocamOutline className="text-primary w-8 h-8" />
      </button>

      {open && (
        <ModalViedo
        open={open}
          onHide={() => setOpen(false)}
          onAccept={handleJoinVidoCallRoom}
          onReject={() => {
            setVideoCallJoinRoomId("");
            setOpen(false);
          }}
    
        />
      )}
    </div>
  );
};

export default Viedo;
