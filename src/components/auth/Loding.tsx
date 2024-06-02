import React from "react";
import { Spinner } from "@material-tailwind/react";

const Loading: React.FC = () => {
    
  return (
    <div className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm absolute z-50 top-0 left-0 w-full h-full flex justify-center items-center">
     <Spinner color="pink" />
    </div>
  );
};

export default Loading;