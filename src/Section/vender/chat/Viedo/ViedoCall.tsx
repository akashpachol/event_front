import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../../../utils/redux/app/store';
import { useSocket } from '../../../../utils/context/SocketContext';
import { userDataTypes } from '../../../../utils/types';

const VideoCall = () => {
  const { roomId } = useParams();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const vender = useSelector((state: RootState) => state.vender);
  const zpRef = useRef<ReturnType<typeof ZegoUIKitPrebuilt.create> | null>(null);
    const [isJoined, setIsJoined] = useState(false);
  const navigate = useNavigate();

  const chat = useSelector((state: RootState) => state.chat);
  const { socket } = useSocket();

  let receiver: userDataTypes | undefined;
  if (chat.data && chat.data.users) {
    receiver = chat.data.users.find((value) => value._id !== vender.venderId);
  }

  const handleLeaveRoom = () => {
    if (zpRef.current) {
      zpRef.current.destroy(); 
      zpRef.current = null; 
    }
    socket?.emit('cancel-call', { receiverId: receiver?._id });
    navigate('/vender/chat');
  };

  
  useEffect(() => {
    if (!containerRef.current || isJoined) return;
  
    const myMeeting = async () => {
      const appId = 490876400;
      const serverSecret = "d76470be7f8b41331b685a24887fbc52";
  
      if (!roomId || !vender.venderId || !vender.vender) {
        console.error("One or more required values are undefined.");
        return;
      }
  
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appId,
        serverSecret,
        roomId,
        vender.venderId,
        vender.vender,
      );
  
      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zpRef.current = zc;
  
      zc.joinRoom({
        container: containerRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: true,
        showPreJoinView: false,
        turnOnCameraWhenJoining: true,
        turnOnMicrophoneWhenJoining: false,
        showLeaveRoomConfirmDialog: false,
        onLeaveRoom: handleLeaveRoom,
     
      });
  
      setIsJoined(true);
      console.log('Joined room successfully');
     
    };
  
    myMeeting();
  }, [roomId, vender.venderId, vender.vender, isJoined, navigate]);

  return (
    <div>
      <div ref={containerRef} className='w-full h-full'  />
    </div>
  );
};

export default VideoCall;




