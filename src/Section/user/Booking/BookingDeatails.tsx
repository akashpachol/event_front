import React, { useEffect, useState } from "react";
import {

  getBookingDetails,
} from "../../../service/api/user/apiMethod";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { ApiResponseOfBooking, bookingData } from "../../../utils/types";

import CancelModal from "./CancelModal";
import { RootState } from "../../../utils/redux/app/store";
import { useSelector } from "react-redux";

const BookingDeatails: React.FC = () => {
  const [bookingData, setBookingData] = useState<bookingData | null>(null);
  const [api, setApi] = useState(false);
  const [open, setOpen] = React.useState(false);
  const user = useSelector((state: RootState) => state.user);

  const location = useLocation();
  const receivedData = location.state;
  useEffect(() => {
    getDetails();
  }, [api]);

  const toggleButton = () => {
    setOpen(!open);
  };

  const getDetails = () => {
    getBookingDetails(receivedData.id)
      .then((response: ApiResponseOfBooking) => {
        if (response.data) {
          setBookingData(response.data as bookingData);
        } else {
          toast.error("No location data found");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const isMoreThan2DaysAhead = () => {
    if (!bookingData || !bookingData.date) return false;

    const bookingDate = new Date(bookingData.date);

    const currentDate = new Date();
    const timeDifference = bookingDate.getTime() - currentDate.getTime();
    const dayDifference = timeDifference / (1000 * 3600 * 24);

    return dayDifference > 2;
  };

  let data={
    reciver:bookingData?.manager._id,
    location:bookingData?.locationData.name,
      user:user.user,
      status:'cancel',
      mode:'manager'
  }

  return (
    <div className="flex flex-col min-h-screen mx-24 ">
      <div className=" bg-gray-50 py-12">
        <header className="bg-primary text-primary-foreground py-4 px-6">
          <h1 className="text-2xl font-bold">Booked  Details</h1>
        </header>
        <main className="flex-1 py-8 px-4 md:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p>
                      {new Date(
                        bookingData?.date ? bookingData?.date : ""
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Time</p>
                    <p>{bookingData?.time}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Location</p>
                    <p>
                      {bookingData?.locationData.address},
                      {bookingData?.locationData.state}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Duration</p>
                    <p>
                      {bookingData?.time == "full Day" ? (
                        <p>12 hours</p>
                      ) : (
                        <p>6 hours</p>
                      )}
                      {bookingData?.time == "evening" ? (
                        <p>(4:00 PM to 11:00 PM)</p>
                      ) : bookingData?.time == "full Day" ? (
                        <p>(9:00 AM to 11:00 PM)</p>
                      ) : (
                        <p>(9:00 AM to 3:00 PM)</p>
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">History Details</h2>
                <div className="space-y-4">
                  <p>{bookingData?.locationData.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <img
                      src={bookingData?.locationData.image[0].url}
                      width={300}
                      height={200}
                      alt="History Image 1"
                      className="rounded-lg object-cover"
                    />
                    <img
                      src={bookingData?.locationData.image[1].url}
                      width={300}
                      height={200}
                      alt="History Image 2"
                      className="rounded-lg object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-muted rounded-lg p-6 shadow-lg bg-white">
              <h2 className="text-xl font-semibold mb-4">
                Additional Information
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground">Location Guide</p>
                  <p>{bookingData?.manager.username}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Group Size</p>
                  <p>{bookingData?.count} people</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Event</p>
                  <p>{bookingData?.event.name} </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Price</p>
                  <p>{bookingData?.total}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Cancellation Policy</p>
                  cancel option is available 2 days  before booked date
                  {isMoreThan2DaysAhead() && (
                    <div className="mt-5 ">
                      {bookingData?.status == "cancelled" ? (
                        <p className="bg-red-200 w-1/2 text-black px-4 py-2 rounded-lg">
                          Cancelled
                        </p>
                      ) : (
                        <div>
                     
                          <button
                            onClick={toggleButton}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                          >
                       
                            Cancel Booking
                          </button>
                          {open && (
                            <CancelModal
                            id={bookingData?._id}
                            api={api} setApi={setApi}
                              toggleButton={toggleButton}
                              open={open}
                              data={data}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BookingDeatails;
