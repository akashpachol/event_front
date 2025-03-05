import React, { useEffect, useState } from 'react';
import { BentoGrid, BentoGridItem } from "./Animation/Card";
import { getFilteredLocation, getLocation, getSearchLocationData } from '../../../service/api/user/apiMethod';
import { toast } from 'react-toastify';
import { location } from '../../../utils/types';
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import topImage from '../../../assets/img/venue_searchban1.jpg';
import { State } from "country-state-city";
import { search } from '../../../utils/SearchLogic';

interface Filters {
  price: number[];
  count: number[];
}

const Location: React.FC = () => {
  const [location, setLocation] = useState<location[]>([]);
  const [filters, setFilters] = useState<Filters>({
    price: [0, 0],
    count: [],
  });

  const [states, setStates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStates, setFilteredStates] = useState([]);

  useEffect(() => {
    const getAllStates = async () => {
      try {
        const statesList = State.getStatesOfCountry("IN");
        setStates(statesList);
      } catch (err) {
        console.log(err);
      }
    };
    getAllStates();
  }, []);

  useEffect(() => {
    getDetails();
  }, []);



  useEffect(() => {
    const debounce = setTimeout(() => {
      const filtered = search(states, searchQuery);
      setFilteredStates(filtered);
    }, 1000);

    return () => clearTimeout(debounce);
  }, [searchQuery, states]);

  const handleSearchChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    try {
      const response = await getSearchLocationData(e.target.value);
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

  useEffect(() => {
    getFilteredDetails();
  }, [filters]);

  const getFilteredDetails = async () => {
    try {
      const response = await getFilteredLocation(filters);
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

  const handleFilterChange = (type: keyof Filters, value: number) => {
    setFilters((prevFilters) => {
      const updatedArray = prevFilters[type].includes(value)
        ? prevFilters[type].filter((item) => item !== value)
        : [...prevFilters[type], value];

      return {
        ...prevFilters,
        [type]: updatedArray,
      };
    });
  };

  const handlePriceChange = (newPrice: number[]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      price: newPrice,
    }));
  };






  return (
    <div>
      <div>
        <section
          className="h-[300px] bg-cover bg-center"
          style={{ backgroundImage: `url(${topImage})`,marginTop:"-25px" }}
        >
          <div className="inset-0 flex items-center justify-center">
            <div className="max-w-2xl my-14 px-4 sm:px-6 lg:px-8 ">
              <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl text-center">
                Find Your Event Sport
              </h1>
              <p className="mt-4 text-lg text-white text-center">
                Search from thousands of hotels worldwide.
              </p>
              <div className="mt-6 relative">
                <input
                  type="text"
                  placeholder="Search state "
                  className="w-full rounded-md border-none bg-white/90 py-3 px-4 text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                {searchQuery && (
  filteredStates.length > 0 ? (
    <ul className="absolute z-10 w-full bg-white border border-gray-200 shadow-lg rounded-md mt-1">
      {filteredStates.map((state) => (
        <li
          key={state.isoCode}
          className="p-2 hover:bg-gray-100 cursor-pointer"
        >
          {state.name}
        </li>
      ))}
    </ul>
  ) : null
)}

              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="relative  h-full flex">
        <div className="sticky h-screen w-1/5">
          <div className="bg-background rounded-lg shadow-sm p-6 h-screen bg-white">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <div className="grid gap-6">
              <div>
                <h3 className="text-base font-medium mb-2">Count</h3>
                <div className="grid gap-2">
                  <label className="flex items-center gap-2 font-normal">
                    <input
                      type="checkbox"
                      checked={filters.count.includes(200)}
                      onChange={() => handleFilterChange("count", 200)}
                    />
                    200
                  </label>
                  <label className="flex items-center gap-2 font-normal">
                    <input
                      type="checkbox"
                      checked={filters.count.includes(1000)}
                      onChange={() => handleFilterChange("count", 1000)}
                    />
                    1000
                  </label>
                  <label className="flex items-center gap-2 font-normal">
                    <input
                      type="checkbox"
                      checked={filters.count.includes(2000)}
                      onChange={() => handleFilterChange("count", 2000)}
                    />
                    2000
                  </label>
                </div>

                <h3 className="text-base font-medium mt-4 mb-2">Price</h3>
                <div className="grid gap-2">
                  <RangeSlider
                    min={1000}
                    max={100000}
                    value={filters.price}
                    onInput={handlePriceChange}
                  />
                  <div className="range-values">
                    Selected range: {filters.price[0]} - {filters.price[1]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ml-auto w-3/4">
          <BentoGrid className="px-10 py-10">
            {location?.map((item) => (
              <BentoGridItem item={item} key={item.id} />
            ))}
          </BentoGrid>
        </div>
      </div>
    </div>
  );
};

export default Location;
