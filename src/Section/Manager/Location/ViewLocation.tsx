"use client";
import { useLocation } from "react-router-dom";
import { LayoutGrid } from "./LayoutGrid";
import { useEffect, useState } from "react";
import { location } from "../../../utils/types";
import { getlocationDetails } from "../../../service/api/manager/apiMethod";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/redux/app/store";

const ViewLocation = () => {
  const [locationData, setLocationData] = useState<location | null>(null);
  const [data, setData] = useState();
  const event = useSelector((state: RootState) => state.event);
  const location = useLocation();
  const receivedData = location.state;
  console.log(receivedData, "jhjfdf");
  useEffect(() => {
    getDetails();
  }, [receivedData]);

  const [state, setState] = useState([]);

  useEffect(() => {
    if (locationData?.image) {
      const cards = locationData.image.slice(0, 4).map((value, index) => ({
        id: index + 1,
        thumbnail: value.url,
        className:
          index == 0 ? "md:row-span-2 col-span-2" : "row-span-1 col-span-1",
      }));
      setState(cards);

      console.log(locationData.type, "locationData");
      console.log(event.data, "event");
      const value = event.data?.filter((location) =>
        locationData.type.includes(location._id)
      );
      setData(value);
    }
  }, [locationData]);
  const getDetails = () => {
    getlocationDetails(receivedData)
      .then((response) => {
        if (response) {
          setLocationData(response.data);
        } else {
          toast.error("No user data found");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  console.log(data, "hdhsdh");

  return (
    <div className="  py-20  w-full bg-white">
      <div className="h-96">
        <LayoutGrid cards={state} />
      </div>

      <div className="card mt-5 mx-20 px-10 border flex">
        <div className="w-1/2">
          <p className="text-2xl ">Overview</p>
          <p>{locationData?.description}</p>
          <p>{locationData?.address}</p>
          <p>{locationData?.state}</p>
          <p>{locationData?.price}</p>
          <p>
            {data?.map((value) => (
              <div>{value.name}</div>
            ))}
          </p>
        </div>
        <div className="w-1/2 mt-5">
          <button className="manager_button">book event</button>
        </div>
      </div>
    </div>
  );
};

export default ViewLocation;
