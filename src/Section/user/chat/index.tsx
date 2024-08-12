import React, { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";

import MyChat from "./MyChat";
import {
  deleteEveryOne,
  getMessage,
  postMessage,
} from "../../../service/api/user/apiMethod";
import { RootState } from "../../../utils/redux/app/store";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { chat, userDataTypes } from "../../../utils/types";
import ScrollableFeed from "react-scrollable-feed";

import { useSocket } from "../../../utils/context/SocketContext";
import { extractTime } from "../../../utils/ExtractTime";
import Picker from "emoji-picker-react";
import { chatSeen } from "../../../utils/ChatLogic";
import Home from "./viedo/Home";
const Chat: React.FC = () => {
  const [newMessage, setNewMessage] = useState<string>("");
  const [showPicker, setShowPicker] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const chat = useSelector((state: RootState) => state.chat);
  const [userSelect, setUserSelect] = useState<userDataTypes | null>(null);
  const [groupSelect, setGroupSelect] = useState<chat | null>(null);
  const { socket, setMessages, messages } = useSocket();

  useEffect(() => {
    if (chat.data) {
      if (chat.data.chatName == "") {
        setGroupSelect(null);
        const selectedUser = chat.data.users?.find(
          (userData) => userData._id !== user.userId
        );
        if (selectedUser) {
          setUserSelect(selectedUser);
        } else {
          setUserSelect(null);
        }
      } else {
        setUserSelect(null);
        setGroupSelect(chat.data);
      }
    }
  }, [chat, user.userId]);
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
  }, [chat.data?._id]);

  const getDetails = async () => {
    try {
      const response = await getMessage(chat.data?._id, user.userId);
      if (response && Array.isArray(response.data)) {
        setMessages(response.data);

        socket?.emit("seen", response.data, chat.data?._id);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleClick = async () => {
    if (newMessage) {
      if (!user.userId) return;
      try {
        const response = await postMessage(
          user.userId,
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
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex h-[90vh] max-h-[90vh] gap-5 justify-center">
      <MyChat />

      <div className="relative flex flex-col w-2/4 bg-white overflow-y-auto">
        <div className="sticky flex justify-between z-20 top-0 p-4 border-b bg-white">
          {userSelect ? (
            <>
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
                </div>

                <div className="text-sm font-medium">{userSelect.username}</div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  className="w-10 h-10 rounded-full"
                  src={`https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg`}
                  alt=""
                />
              </div>

              <div className="text-sm font-medium">{groupSelect?.chatName}</div>
            </div>
          )}

<div className="me-10 mt-3"><Home /></div>

        </div>

        <div className="flex-1 ">
          <div className="  p-4 space-y-4 h-full">
            <div className=" h-full w-full ">
              <ScrollableFeed>
                {messages?.map((value: any) => (
                  <>
                    {value.sender._id === user?.userId ? (
                      <div
                        className={`flex justify-end gap-3 `}
                        key={value._id}
                        onClick={() => handleDropdownToggle(value._id)}
                      >
                        <div
                          className={`bg-primary flex justify-between rounded-md p-2 max-w-[80%] my-3  min-w-36 text-primary-foreground text-white  bg-blue-500`}
                        >
                          <div className="text-sm ">{value.content}</div>
                          <div className="text-[10px] text-primary-foreground/80 mt-1">
                            {extractTime(value.createdAt)}
                            {chatSeen(
                              user.userId,
                              value.chatId.users,
                              value.readBy
                            ) ? (
                              <span className="text-blue-600">✓✓</span>
                            ) : (
                              <span className="text-gray-500">✓✓</span>
                            )}
                          </div>
                        </div>
                        {openDropdown === value._id && (
                          <div
                            className={`absolute bg-white right-40 mt-10 border rounded shadow-lg transition-opacity duration-700 ease-in-out ${
                              openDropdown === value._id
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          >
                            <ul>
                              <li
                                className="p-2"
                                onClick={() =>
                                  handleMessageForEveryOne(value._id)
                                }
                              >
                                Delete for every one{" "}
                              </li>
                              <li className="p-2">Delete for me</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className={`flex  gap-3 `} key={value._id}>
                        <div
                          className={`bg-primary flex justify-between rounded-md p-2 max-w-[80%] my-3  min-w-36 text-primary-foreground bg-gray-200`}
                        >
                          <div className="text-sm ">{value.content}</div>
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
    </div>
  );
};

export default Chat;
