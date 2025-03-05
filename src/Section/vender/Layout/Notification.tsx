import Drawer from "@mui/material/Drawer";
import { FaMinusCircle } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/redux/app/store";
import { toast } from "react-toastify";
import { getNotification } from "../../../service/api/manager/apiMethod";
import { notification } from "../../../utils/types";
import { useSocket } from "../../../utils/context/SocketContext";

type ModalProps = {
  open: boolean;
  toggleDrawer: (open: boolean) => void;
  api:boolean,
  setApi:React.Dispatch<React.SetStateAction<boolean>>;


};
export type dataProps={
  reciver:string,
  location:string,
  user:string,
  status:string
}


const Notification: React.FC<ModalProps> = ({ open, toggleDrawer,api,setApi }) => {
  const [notification, setNotification] = useState<notification[]>([]);
  const vender = useSelector((state: RootState) => state.vender);


  const { socket } = useSocket();

  useEffect(() => {

    socket?.on("responseNotification", (data) => {
      console.log("Received responseNotification:", data);

      getDetails();
    });

    return () => {
      socket?.off("responseNotification");
    };
  }, [socket, notification, setNotification]);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    try {
      if (!vender.venderId) return;

      const response = await getNotification(vender.venderId);
      if (response && Array.isArray(response.data)) {
      setApi(!api)
    
        setNotification(response.data);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };


  return (
    <div>
      <Drawer anchor="right" open={open} onClose={() => toggleDrawer(false)}>
        <div
          className="w-[24rem]"
          role="presentation"
          onClick={() => toggleDrawer(false)}
          onKeyDown={() => toggleDrawer(false)}
        >
          <div>
            <div className="flex  justify-between mt-5 mx-5 gap-3">
              <p className="text-xl">Notification</p>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-red-500 ml-4">
                <FaMinusCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 max-h-80 overflow-y-auto mt-5">
              {notification.map((value) => (

                <>
{value.bookingVender?(
  <div
  className={`flex items-start gap-3 mb-8 ${
    value.isSeen ? "bg-[#DFF5EB]" : "bg-[#33d687]"
  } mx-5 py-5`}
>
  <div className="flex my-auto items-center justify-center rounded-full bg-primary text-primary-foreground">
    {/* {value.event == "cancelled" ? (
      <MdCancel className="h-8 w-8" />
    ) : (
      <MdOutlineEventAvailable className="h-8 w-8" />
    )} */}
  </div>
  <div className="flex-1 space-y-1 ">
    <p className="text-sm font-medium">
       Event {value.event}
    </p>
    <p className="text-sm text-muted-foreground">
     {value.senderId&&value.senderId.username}  have {value.event=='booked'?'booked new event':'a event cancelled'}  in {value.bookingVender?.venderData.name}.
    </p>
    <p className="text-xs text-muted-foreground">
      {/* 2 minutes ago */}
    </p>
  </div>
</div>
):('')}


                </>
               
              ))}
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Notification;
