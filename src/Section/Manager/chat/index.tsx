import React, { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import MyChat from "./MyChat";

import { RootState } from "../../../utils/redux/app/store";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { message, userDataTypes } from "../../../utils/types";
import ScrollableFeed from "react-scrollable-feed";

import { useSocket } from "../../../utils/context/SocketContext";
import {
  deleteEveryOne,
  deleteForMe,
  getMessage,
  postMessage,
} from "../../../service/api/manager/apiMethod";
import Picker from "emoji-picker-react";
import { extractTime } from "../../../utils/ExtractTime";

import chatImage from "../../../assets/img/chat.jpg";
import { chatSeen } from "../../../utils/ChatLogic";

const Chat: React.FC = () => {
  // const [messages, setMessages] = useState<message[]>([]);
  const [showChat, setShowChat] = useState(false);
  const [api, setApi] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [newMessage, setNewMessage] = useState<string>("");
  const manager = useSelector((state: RootState) => state.manager);
  const { onlineUsers, socket,setMessages,messages } = useSocket();
  const chat = useSelector((state: RootState) => state.chat);

  const userSelect: userDataTypes | undefined = chat.data?.users.find(
    (user) => user._id !== manager.managerId
  );

  useEffect(() => {
    socket?.on("receiveMsg", (message) => {
      getDetails();
    });
    return () => {
      socket?.off("receiveMsg");
    };
  }, [socket, messages, setMessages]);





  useEffect(() => {
    getDetails();
    socket?.emit("join chat", chat.data?._id);
  }, [chat.data?._id, api]);

   const getDetails = async () => {
    try {
      if (!manager.managerId) return;

      const response = await getMessage(chat.data?._id, manager.managerId);
      if (response && Array.isArray(response.data)) {
        console.log(response.data, "kkkk");

        setMessages(response.data);
        socket?.emit("seen", response.data, chat.data?._id);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  const handleClick = async () => {
    if (newMessage) {
      if (!manager.managerId) return;
      try {
        const response = await postMessage(
          manager.managerId,
          chat.data?._id,
          newMessage
        );
        if (response.status === "success") {
          if (response.data) {
            socket?.emit("new message", response.data, chat.data?._id);

            setMessages([...messages, response.data]);
            setNewMessage("");
          }
        }
      } catch (error) {
        const errorMessage = (error as Error).message;
        toast.error(errorMessage);
      }
    }
  };

  const onEmojiClick = (emojiObject: any) => {
    setNewMessage((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };

  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownToggle = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleMessageForEveryOne = async (id: string) => {
    try {
      const response = await deleteEveryOne(id);
      if (response.status === "success") {
        socket?.emit("deleteEveryOne", id, chat.data?._id);

        setApi(!api);
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(errorMessage);
    }
  };

  const handleMessageDeleteForMe = async (id: string) => {
    try {
      if (!manager.managerId) return;
      const response = await deleteForMe(id, manager.managerId);
      if (response.status === "success") {
        setApi(!api);
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex h-[90vh] max-h-[90vh] gap-5 justify-center">
      <MyChat showChat={setShowChat} />

      {showChat ? (
        <div className="relative flex flex-col w-2/4 bg-white overflow-y-auto">
          <div className=" flex justify-between sticky z-20 top-0 p-4 border-b bg-white">
            {userSelect ? (
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={
                      userSelect.image
                        ? userSelect.image
                        : `https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg`
                    }
                    alt=""
                  />
                  {onlineUsers?.includes(userSelect._id) ? (
                    <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 border-2 border-white dark:border-gray-800 rounded-full"></span>
                  ) : (
                    ""
                  )}
                </div>

                <div className="text-sm font-medium">{userSelect.username}</div>
              </div>
            ) : (
              ""
            )}
            <div className="me-10 mt-3">viedo</div>
          </div>

          <div className="flex-1 ">
            <div className="  p-4 space-y-4 h-full">
              <div className=" h-full w-full ">
              <ScrollableFeed>
  {messages?.map((value: any) => (
    < >
      {
      console.log('Message:', value)     }
     
      {value.sender._id === manager?.managerId ? (
        value.deletedBy === manager?.managerId ? (
          ""
        ) : (
          <div
            className={`flex justify-end gap-3`}
            onClick={() => handleDropdownToggle(value._id)}
          >
            <div
              className={`bg-primary flex justify-between rounded-md p-2 max-w-[80%] my-3 min-w-36 text-primary-foreground text-white bg-green-300`}
            >
              <div className="text-sm">{value.content}</div>
              <div className="text-[12px] text-primary-foreground/80 mt-1">
                {extractTime(value.createdAt)}
                {chatSeen(manager.managerId, value.chatId.users, value.readBy) ? (
                  <span className="text-blue-600">✓✓</span>
                ) : (
                  <span className="text-gray-500">✓✓</span>
                )}
              </div>
            </div>

            {openDropdown === value._id && (
              <div
                className={`absolute bg-white right-40 mt-10 border rounded shadow-lg transition-opacity duration-700 ease-in-out ${
                  openDropdown === value._id ? "opacity-100" : "opacity-0"
                }`}
              >
                <ul>
                  <li
                    className="p-2"
                    onClick={() => handleMessageForEveryOne(value._id)}
                  >
                    Delete for everyone
                  </li>
                  <li
                    className="p-2"
                    onClick={() => handleMessageDeleteForMe(value._id)}
                  >
                    Delete for me
                  </li>
                </ul>
              </div>
            )}
          </div>
        )
      ) : (
        <div className={`flex gap-3`}>
          <div
            className={`bg-primary flex justify-between rounded-md p-2 max-w-[80%] my-3 min-w-36 text-primary-foreground bg-gray-200`}
          >
            <div className="text-sm">{value.content}</div>
            <div className="text-[10px] text-primary-foreground/80 mt-1">
              {extractTime(value.createdAt)}
            </div>
          </div>
        </div>
      )}
    </>
  ))}
</ScrollableFeed>

              </div>

              <div className=" sticky  bottom-4 mx-2   bg-background w-[94%]">
                <div className="relative ">
                  <img
                    className="emoji-icon absolute top-3 left-3"
                    src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                    onClick={() => setShowPicker((val) => !val)}
                  />
                  {showPicker && <Picker onEmojiClick={onEmojiClick} />}
                  <input
                    placeholder="Type your message..."
                    value={newMessage}
                    className="min-h-[36px] rounded-xl w-full border-2 resize-none px-10 py-2 pr-16"
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute w-8 h-8 top-1 right-3"
                  >
                    <IoMdSend onClick={handleClick} className="w-5 h-5" />
                    <span className="sr-only">Send</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex bg-white h-full w-2/4  items-center justify-center">
          <div className="grid gap-4 text-center">
            <img
              src={chatImage}
              alt="Get to messaging"
              width={400}
              height={400}
              className="mx-auto"
            />
            <div className="text-2xl font-semibold text-white">
              Get to messaging
            </div>
            <div className="text-muted-foreground">
              Select a conversation to start chatting.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
