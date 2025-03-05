import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import  { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../../../utils/redux/app/store';
import { useSocket } from '../../../../utils/context/SocketContext';
import { userDataTypes } from '../../../../utils/types';


const VideoCall=()=> {
  const { roomId } = useParams();
  const containerRef = useRef(null);
  const user = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  const chat = useSelector((state: RootState) => state.chat);
  const { socket } = useSocket();
  const zpRef = useRef<ReturnType<typeof ZegoUIKitPrebuilt.create> | null>(null);

  let reciver: userDataTypes|undefined;
  if (chat.data && chat.data.users) {
    reciver = chat.data.users.find((value) => value._id !== user.userId);
  }
  const handleLeaveRoom = () => {
    if (zpRef.current) {
      zpRef.current.destroy(); 
      zpRef.current = null; 
    }
    socket?.emit('cancel-call', { receiverId: reciver?._id });
    navigate('/chat');
  }

  useEffect(() => {
    if(!containerRef.current ) return

    const myMeeting = async() => {
      const appId = 490876400
      const serverSecret = "d76470be7f8b41331b685a24887fbc52"
      if (!roomId || !user.userId || !  user.user) {
        console.error("One or more required values are undefined.");
        return;
      }
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appId,
        serverSecret,
        roomId,
        user.userId,
        user.user,
      )
      const zc = ZegoUIKitPrebuilt.create(kitToken)
      zpRef.current = zc;
      zc.joinRoom({
        container: containerRef.current,
          scenario:{
              mode:ZegoUIKitPrebuilt.OneONoneCall,
          },
          showScreenSharingButton:true,
          showPreJoinView: false ,
          turnOnCameraWhenJoining: true,
          turnOnMicrophoneWhenJoining: false,
          showLeaveRoomConfirmDialog: false,
          onLeaveRoom: handleLeaveRoom,
          onUserLeave: handleLeaveRoom,
      })
    }
    myMeeting()


    
  },[ roomId, user.userId, user.user, navigate ])

  return (
    <div>
      <div ref={containerRef} className='w-full h-full' />
  </div>
  )
}

export default VideoCall