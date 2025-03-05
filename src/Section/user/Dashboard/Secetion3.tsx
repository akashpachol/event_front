import React, { useState, useEffect } from "react";
import LocationCard from "../../../components/user/LocationCard";
import { Link } from "react-router-dom";
import { getLocation } from "../../../service/api/user/apiMethod";
import { location } from "../../../utils/types";
import { toast } from "react-toastify";

const Section3: React.FC = () => {
  const [cardsToShow, setCardsToShow] = useState(4);
  const [location, setLocation] = useState<location[]>([]);

  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth >= 1280) {
        setCardsToShow(4);
      } else if (window.innerWidth >= 768) {
        setCardsToShow(2);
      } else {
        setCardsToShow(1);
      }
    };

    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);

    return () => {
      window.removeEventListener("resize", updateCardsToShow);
    };
  }, []);


  useEffect(() => {
    getDetails();
  }, []);


  const getDetails = async () => {
    try {
      const response = await getLocation();
      if (response && Array.isArray(response.data)) {
        setLocation(response.data);
      } else {
        toast.error("No user data found");
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
    <section>
      <h1 className="h1">Recommended Venues</h1>
      <p className="text-end text-lg text-blue-500"><Link to='/location'>more</Link></p>
      <div className="flex items-center justify-center">
        <div className="overflow-hidden w-full">
          <div className="flex transition-transform duration-500 ease-in-out">
            {location.slice(0,4).map((locationCardData) => (
              <div
                key={locationCardData.name}
                style={{ flex: `0 0 ${100 / cardsToShow}%` }}
              >
                <LocationCard {...locationCardData} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section3;
