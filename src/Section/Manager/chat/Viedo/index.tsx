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
  const manager = useSelector((state: RootState) => state.manager);
  const chat = useSelector((state: RootState) => state.chat);
  const { socket } = useSocket();

  let reciver:userDataTypes|undefined;
  if (chat.data && chat.data.users) {
    reciver = chat.data.users.find((value) => value._id !== manager.managerId);
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
      senderId: manager.managerId,
      senderName: manager.managerId,
      senderProfile: manager.manager,
      receiverId,
      roomId: roomId,
    };
    socket?.emit("videoCallRequest", emitData);
    navigate(`/manager/video-call/${roomId}/${manager.managerId}`);
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
    console.log(
      "in video room",
      `/video-call/${videoCallJoinRoomId}/${manager.managerId}`
    );
    navigate(`/manager/video-call/${videoCallJoinRoomId}/${manager.managerId}`);
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
