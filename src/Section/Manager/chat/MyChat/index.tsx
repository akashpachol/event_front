import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { chat, userDataTypes } from "../../../../utils/types";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../utils/redux/app/store";

import {
  getAllChats,
  postChat,
  searchData,
} from "../../../../service/api/manager/apiMethod";
import GroupModal from "./GroupModal";
import Conversation from "./Conversation";
import { Link } from "react-router-dom";
import { chatAdd } from "../../../../utils/redux/slice/chatSlice";
import { useSocket } from "../../../../utils/context/SocketContext";

type propMychat = {
  showChat: React.Dispatch<React.SetStateAction<boolean>>;
};

const MyChat: React.FC<propMychat> = ({ showChat }) => {
  const [conversations, setConversations] = useState<chat[] | []>([]);
  const [searchResult, setSearchResult] = useState<userDataTypes[] | []>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [api, setApi] = useState(false);
  const dispatch = useDispatch();
  const { socket } = useSocket();

  const [open, setOpen] = React.useState(false);

  const toggleButton = () => {
    setOpen(!open);
  };

  const manager = useSelector((state: RootState) => state.manager);

  useEffect(() => {
    getDetails();
  }, [api]);

  const getDetails = async () => {
    try {
      if (!manager.managerId) {
        return;
      }

      const response = await getAllChats(manager.managerId);
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
      if (!query || !manager.managerId) {
        setSearchResult([]);
        return;
      }
      setSearchQuery(query);
      const response = await searchData(query, "admin", manager.managerId);
      if (response && Array.isArray(response.data)) {
        setSearchResult(response.data);
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(errorMessage);
    }
  };

  const handleCreateChat = async (managerValue: userDataTypes) => {
    try {
      if (!manager.managerId) return;

      const response = await postChat(manager.managerId, managerValue._id);
      if (response.status === "success") {
        if (response.data) dispatch(chatAdd({ data: response.data }));

        showChat(true);

        socket?.emit("join chat", response.data?._id);
        setSearchResult([]);
        setSearchQuery("");
        setApi(!api);
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(errorMessage);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  return (
    <div className="bg-muted border-r w-1/4 p-4 overflow-y-auto bg-white">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>My Chats</div>
        <div onClick={toggleButton}>Create Group</div>
      </div>

      <div className="relative flex items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Search contacts"
          className="w-full px-3 py-2 text-sm bg-transparent rounded-lg focus-visible:ring-0 ring-0 focus-visible:ring-offset-0 pl-6"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button className="rounded-full">
          <CiSearch className="w-5 h-5 absolute left-0 top-2" />
        </button>
      </div>

      {searchResult.length > 0 ? (
        searchResult.map((value) => (
          <>
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
        ))
      ) : (
        <Conversation showChat={showChat} data={conversations} />
      )}

      {open && (
        <GroupModal
          setApi={setApi}
          api={api}
          toggleButton={toggleButton}
          open={open}
        />
      )}
    </div>
  );
};

export default MyChat;
