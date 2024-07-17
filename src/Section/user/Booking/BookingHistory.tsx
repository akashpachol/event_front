import React, { useCallback, useEffect, useState } from "react";
import Sidebar from "../Settings/contents/Sidebar";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { getBookingHistory } from "../../../service/api/user/apiMethod";
import { RootState } from "../../../utils/redux/app/store";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ApiResponseOfBooking, bookingData } from "../../../utils/types";

const BookingHistory: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const [bookingData, setBookingData] = useState<bookingData[]|null>(null);

  const user = useSelector((state: RootState) => state.user);
  const getDetails = useCallback(() => {
    getBookingHistory(user.userId)
      .then((response:ApiResponseOfBooking) => {
        if (response.data) {
          if (Array.isArray(response.data)) {
            console.log(response.data, "response.data");
            setBookingData(response.data);
          } else {
            toast.error("Unexpected response format");
          }
        } else {
          toast.error("No location data found");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  useEffect(() => {
    getDetails();
  }, [getDetails]);



  
  return (


    <div className="h-screen flex flex-col ">
    <div className="flex-grow flex justify-center items-center lg:px-48">
    <Sidebar />
      <div className="sm:w-2/3  ">
      <div className="max-w-4xl mx-auto px-4 sm:px-6  py-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Booking History</h1>
      <div className="grid grid-cols-2 gap-6">
        {bookingData?.map((booking) => (
          <div
            key={booking._id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <div className="px-6 py-4">
              <h2 className="text-xl font-bold mb-2">{booking.name}</h2>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700">{new Date(booking.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ClockIcon className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700">{booking.time}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <LocateIcon className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700">{booking.locationData.address},{booking.locationData.state}</span>
              </div>
            </div>
            <div className="bg-gray-100 px-6 py-4 border-t">
              <button onClick={()=>navigate('/bookingDetails',{state:{id:booking._id}})} className="text-blue-500 hover:text-blue-700">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>










      </div>
    </div>
  </div>
   
  );
};

export default BookingHistory;



type IconProps = React.SVGProps<SVGSVGElement>;

const CalendarIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
  </svg>
);

const ClockIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const LocateIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="2" x2="5" y1="12" y2="12" />
    <line x1="19" x2="22" y1="12" y2="12" />
    <line x1="12" x2="12" y1="2" y2="5" />
    <line x1="12" x2="12" y1="19" y2="22" />
    <circle cx="12" cy="12" r="7" />
  </svg>
);
