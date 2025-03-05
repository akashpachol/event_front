import React from "react";
import { location } from "../../utils/types";
import { NavigateFunction, useNavigate } from "react-router-dom";

const LocationCard: React.FC<location> = ({
  _id,
  name,
  image,
  state,
  price,
}) => {

  const navigate: NavigateFunction = useNavigate();

  return (
    <div className="p-3 py-4 border  hover:shadow-2xl hover:shadow-cyan-500/50 mx-2" onClick={()=> navigate('/details',{state:_id})}>
      <img
      src={image[0]?.url}
        className="mb-4 h-48 w-full transition-transform duration-700 ease-in-out transform hover:scale-105"
        alt={name}
      />
      <div className=""></div>
      <div>
        <span className="text-base font-medium mb-2">{name}</span>
        <p className="font-sm">{price}</p>
        <span className="font-sm">{state}</span>
      </div>
    </div>
  );
};

export default LocationCard;
