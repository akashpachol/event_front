
import { useLocation } from "react-router-dom";
import { LayoutGrid } from "./LayoutGrid";
import { useCallback, useEffect, useState } from "react";
import {
  ApiResponseLocation,
  vender,
} from "../../../utils/types";
import { toast } from "react-toastify";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getVenderBooking, getVenderDetails } from "../../../service/api/vender/apiMethod";

const localizer = momentLocalizer(moment);



const timeMapping = {
  morning: { start: 9, end: 15 },
  'full Day': { start: 9, end: 22 },
  evening: { start: 16, end: 22 }
};


const ViewVender = () => {
  const [venderData, setVenderData] = useState<vender | null>(null);
  const [venderbooking, setVenderbooking] = useState([]);


  const location = useLocation();
  const receivedData = location.state;
  const getDetails = useCallback(() => {
    getVenderDetails(receivedData)
      .then((response: ApiResponseLocation) => {
        if (response.data) {
          setVenderData(response.data as vender);
        } else {
          toast.error("No location data found");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [receivedData]);

  useEffect(() => {
    getDetails();

    if(receivedData){
      getBooking()

    }
  }, [getDetails]);



  const getBooking=()=>{
    getVenderBooking(receivedData)
    .then((response: ApiResponseLocation) => {
      if (response && Array.isArray(response.data)) {

        const bookings = response.data.map((item) => {
          const date = new Date(item.date);
          const timeRange = timeMapping[item.time] 
          
          return {
            start: new Date(date.getFullYear(), date.getMonth(), date.getDate(), timeRange.start, 0), // Set start time
            end: new Date(date.getFullYear(), date.getMonth(), date.getDate(), timeRange.end, 0),   // Set end time
            title:`${item.event.name} in ${item.time}` 
          };
        });
      
        setVenderbooking(bookings)
       
      } else {
        toast.error("No location data found");
      }
    })
    .catch((error) => {
      toast.error(error.message);
    });
  }


  const [state, setState] = useState<
    { id: number; thumbnail: string; className: string }[]
  >([]);

  useEffect(() => {
    if (venderData?.image) {
      const cards = venderData.image.slice(0, 4).map((value, index) => ({
        id: index + 1,
        thumbnail: value,
        className:
          index == 0 ? "md:row-span-2 col-span-2" : "row-span-1 col-span-1",
      }));
      setState(cards);

    }
  }, [venderData]);


  const eventPropGetter = () => {
    const backgroundColor =  "#1DC2AF"; 
    return { style: { backgroundColor } };
  };
  return (
    <div className="  py-20  w-full bg-white">
      <div className="h-96">
        <LayoutGrid cards={state} />
      </div>

      <div className="card mt-5  px-10 border ">
     
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Name
              </th>

              <td className="px-6 py-4">{venderData?.name}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Address
              </th>

              <td className="px-6 py-4 break-words">
                {venderData?.address},{venderData?.state}
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                description
              </th>

              <td className="px-6 py-4">{venderData?.description}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                price
              </th>

              <td className="px-6 py-4">{venderData?.price}</td>
            </tr>
    

        
          </tbody>
        </table>
    
      </div>

      <div className="card mt-5 ">
      <Calendar
     
    
        localizer={localizer}
        events={venderbooking}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={eventPropGetter} 
      />
    </div>
    </div>
  );
};

export default ViewVender;
