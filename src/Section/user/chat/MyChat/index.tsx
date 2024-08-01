import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {  getUnreadMessages, postChat, searchData } from "../../../../service/api/user/apiMethod";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

import { useSocket } from "../../../../utils/context/SocketContext";
import { chat, userDataTypes } from "../../../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../utils/redux/app/store";
import { chatAdd } from "../../../../utils/redux/slice/chatSlice";
import Conversation from "./Conversation";
import { getAllChats } from "../../../../service/api/manager/apiMethod";

const MyChat: React.FC = () => {
  const [conversations, setConversations] = useState<chat[] | []>([]);
  const [searchResult, setSearchResult] = useState<userDataTypes[]|[]>([]);


  const { socket } = useSocket();

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);


  




  useEffect(() => {
    getDetails();
  }, []);

  
  const getDetails = async () => {
    try {
      if (!user.userId) {
        return;
      }

      const response = await getAllChats( user.userId);
      if (response && Array.isArray(response.data)) {
        setConversations(response.data);
      } else {
        toast.error("No user data found");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };


  
  const handleSearch = async (query: string) => {
    try {
      if (!query||!user.userId) {
        setSearchResult([])
        return;

      }

      const response = await searchData(query,'manager',user.userId);
      if (response && Array.isArray(response.data)) {
        setSearchResult(response.data);
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(errorMessage);
    }
  };

  const handleCreateChat=async(managerValue:userDataTypes)=>{

    try {
   
      if(!user.userId)return

      const response = await postChat(
        user.userId,
        managerValue._id,
        
      );
      if (response.status === "success") {

     if(response.data){
      socket?.emit('join chat', response.data?._id);
    

      dispatch(chatAdd({ data: response.data }))
     }
    
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(errorMessage);
    }

  }

  return (
    <div className="bg-muted border-r w-1/4 p-4 overflow-y-auto bg-white">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>My Chats</div>
      </div>

      <div className="relative flex items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Search contacts"
          className="w-full px-3 py-2 text-sm bg-transparent rounded-lg focus-visible:ring-0 ring-0 focus-visible:ring-offset-0 pl-6"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button className="rounded-full">
          <CiSearch className="w-5 h-5 absolute left-0 top-2" />
        </button>
      </div>

      {searchResult.length>0?
      
      searchResult.map((value)=>(
     
 <>
    {console.log('hai',value)
        }
        <div
         onClick={() => handleCreateChat(value)}
      key={value._id}
className="space-y-2"

>
<p>
  <Link
    to={``}
    className={`flex items-center gap-3 p-3 rounded-lg hover:bg-blue-500 border-2 hover:text-white `}
  >
    <div className="relative">
      <img
        className="w-10 h-10 rounded-full"
        src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
        alt=""
      />
   
    </div>
    <div className="flex-1 space-y-1 hidden lg:block">
      <div className="flex  justify-between">
        <div>
          <h4 className="font-medium text-lg">
            {value.username}
          </h4>
        </div>
      </div>
    </div>
  </Link>
</p>
</div>  

 
 </>
      )
      )
      :(
      <Conversation data={conversations} />
      )}
    </div>
  );
};

export default MyChat;
