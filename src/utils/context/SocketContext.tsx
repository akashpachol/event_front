import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useSelector } from 'react-redux'
import { io, Socket } from 'socket.io-client';
import { RootState } from '../redux/app/store';
import { BASE_URL } from '../constants/baseUrls';


interface SocketContextType {
  socket: Socket | null;
  onlineUsers: string[] | undefined;
}

const SocketContext = createContext<SocketContextType>({ socket: null,onlineUsers: []});


export const useSocket = () => {
  return useContext(SocketContext);
};

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])
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

      //socket .on is used to listen to the events.
      
      newSocket?.on('getOnlineUsers', (users) => {
        console.log('users online sare ', users)
        setOnlineUsers(users)
      })

      return () => {
        newSocket.off('getOnlineUsers')
        newSocket.disconnect();
      };
    
    } else {
      console.log('soket');
      
      setSocket(null)
    }
  }, [loggedUser]);

  return (
    <SocketContext.Provider  value={{ socket, onlineUsers }} >
      {children}
    </SocketContext.Provider>
  );
};
