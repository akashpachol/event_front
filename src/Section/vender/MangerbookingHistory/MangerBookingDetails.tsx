import React, { useEffect, useState } from "react";


import { toast } from "react-toastify";
import {  bookingVenderData } from "../../../utils/types";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/redux/app/store";
import { getManagerBookingDetails } from "../../../service/api/vender/apiMethod";

const ManagerBookingDetails: React.FC = () => {
  const [receivedData, setReceivedData] = useState<bookingVenderData | null>(null);
  const book = useSelector((state: RootState) => state.book);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    try {
      const response = await getManagerBookingDetails(book.data);

      if (response.data) {
        
        setReceivedData(response.data);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };
console.log(receivedData,'fff');

  return (
    <div className="flex flex-col min-h-screen mx-24 ">
      <div className=" bg-gray-50 py-12">
        <header className="bg-primary text-primary-foreground py-4 px-6">
          <h1 className="text-2xl font-bold">Booked History Details</h1>
        </header>
        <main className="flex-1 py-8 px-4 md:px-8 lg:px-12">
          <div className="grid md:grid-cols-1 gap-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Booking Details</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p>{receivedData?.date}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Price</p>
                    <p>{receivedData?.total}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Location</p>
                    <p>
                      {receivedData?.venderData.address},
                      {receivedData?.venderData.state}
                    </p>
                  </div>
                 
               
               
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">History Details</h2>
                <div className="space-y-4">
                  <p>{receivedData?.venderData.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <img
                      src={receivedData?.venderData.image[0]}
                    
                      alt="History Image 1"
                      className="rounded-lg object-cover  w-96 h-60"
                    />
                    <img
                      src={receivedData?.venderData.image[1]}
                   
                      alt="History Image 2"
                      className="rounded-lg object-cover w-96 h-60"
                    />
                  </div>
                </div>
              </div>

            
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManagerBookingDetails;
