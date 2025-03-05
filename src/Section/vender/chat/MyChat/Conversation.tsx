import React, { useState } from "react";
import { chat } from "../../../../utils/types";
import { Link } from "react-router-dom";
import { useSocket } from "../../../../utils/context/SocketContext";
import { getSender } from "../../../../utils/ChatLogic";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../utils/redux/app/store";
import { chatAdd } from "../../../../utils/redux/slice/chatSlice";

type chatData = {
  data: chat[];
  showChat:React.Dispatch<React.SetStateAction<boolean>>;
};
const Conversation:React.FC<chatData> = ({data,showChat}) => {
  const [state, setState] = useState("");
  const { onlineUsers ,socket} = useSocket();
  const vender = useSelector((state: RootState) => state.vender);
  const dispatch = useDispatch();
 



  const handleClick=(conversation:chat)=>{
  
      if (conversation._id) {
          setState(conversation._id)
          socket?.emit('join chat', conversation?._id);
          dispatch(chatAdd({ data: conversation }));
          showChat(true)
      }
     
  
  }
  
  

return (
  <>
     <div className="space-y-4">
      {data.map((conversation:chat) => 
      
      conversation.isGroupChat?(
<>

<div
          key={conversation._id}
          className="space-y-2"
          onClick={() =>handleClick(conversation)}
          
        >
         
          <p>
            <Link
              to={``}
              className={`flex items-center gap-3 p-3 rounded-lg hover:bg-blue-500 border-2 hover:text-white ${
                state == conversation._id ? "bg-blue-500 text-white" : ""
              }`}
            >
              <div className="relative">
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
                  alt=""
                />
                {onlineUsers?.includes(conversation._id) ? (
                  <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                ) : (
                  ""
                )}
              </div>
              <div className="flex-1 space-y-1 hidden lg:block">
                <div className="flex  justify-between">
                  <div>
                    <h4 className="font-medium text-lg">
                      {conversation.chatName}
                    </h4>
                  </div>
                </div>
              </div>
            </Link>
          </p>
        </div>
</>
       
      ):(
        <>
        {console.log(conversation,'ghjfhgjkh')
        }

        <div
        key={conversation._id}
        className="space-y-2"
        onClick={() =>handleClick(conversation)}
        >
        <p>
          <Link
            to={``}
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-blue-500 border-2 hover:text-white ${
              state == conversation._id ? "bg-blue-500 text-white" : ""
            }`}
          >
            <div className="relative">
              <img
                className="w-10 h-10 rounded-full"
                src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
                alt=""
              />
              {onlineUsers?.includes(getSender(vender.venderId,conversation.users)._id) ? (
                <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              ) : (
                ""
              )}
            </div>
            <div className="flex-1 space-y-1 hidden lg:block">
              <div className="flex  justify-between">
                <div>
                  <h4 className="font-medium text-lg">
                    {getSender(vender.venderId,conversation.users).username}
                  </h4>
                </div>
                <div className="items-center me-3">
                          {/* {getUnreadmessage(vender.venderId,conversation.messages) > 0 ? (
                            <span className="  bg-red-600 text-white text-xs  font-bold rounded-full w-7 h-7 flex items-center justify-center">{getUnreadmessage(user.userId,conversation.messages)}</span>
                          ) : (
                            ""
                          )} */}
                        </div>
              </div>
            </div>
          </Link>
        </p>
      </div>
        </>
       
        
      )
        
)}
    </div>
  </>
);
}


export default Conversation;
