import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useSelector } from 'react-redux'
import { io, Socket } from 'socket.io-client';
import { RootState } from '../redux/app/store';
import { BASE_URL } from '../constants/baseUrls';
import { message } from '../types';


interface SocketContextType {
  socket: Socket | null;
  onlineUsers: string[] | undefined;
  messages:message[],
  setMessages:any
}

const SocketContext = createContext<SocketContextType>({ socket: null,onlineUsers: [],messages:[],setMessages: () => {} });


export const useSocket = () => {
  return useContext(SocketContext);
};

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])
  const [messages, setMessages] = useState<message[]>([]);

  const user = useSelector((state:RootState) => state.user)
  const manager = useSelector((state:RootState) => state.manager)
  const vender = useSelector((state:RootState) => state.vender)
  const loggedUser = user.userId ? user.userId : manager.managerId? manager.managerId:vender.venderId

  useEffect(() => {
    if (loggedUser) {
      const newSocket = io(BASE_URL, {
        query: {
          userId: loggedUser
        }
      });
      setSocket(newSocket);      
      newSocket?.on('getOnlineUsers', (users) => {
        console.log('users online sare ', users)
        setOnlineUsers(users)
      })

      newSocket?.on("responseSeen", (MessageData) => {
        console.log(MessageData, "gh");
  
        setMessages(MessageData);
      });
      newSocket?.on("responsedeleteEveryOne", (messageId) => {
        const updatedMessages = messages.filter((item) => item._id != messageId);
        setMessages(updatedMessages);
      });
 

      return () => {
        newSocket.off('getOnlineUsers')
        newSocket?.off("responseSeen");
        newSocket?.off("responsedeleteEveryOne");

        newSocket.disconnect();
      };
    
    } else {
      console.log('soket');
      
      setSocket(null)
    }
  }, [loggedUser]);

  return (
    <SocketContext.Provider  value={{ socket, onlineUsers,messages, setMessages }} >
      {children}
    </SocketContext.Provider>
  );
};
