import React from "react";
import { BentoGrid, BentoGridItem } from "./Card";
import { useLocation } from "react-router-dom";

const ViewLocation: React.FC = () => {
  const location = useLocation();
  const receivedData = location.state;
  return (
    <div className="">
      <BentoGrid className="w-full  px-10">
        {receivedData?.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.name}
            description={item.description}
            header={item.image}
            verify={item.verify}
            id={item._id}
            className={""}
          />
        ))}
      </BentoGrid>
    </div>
  );
};

export default ViewLocation;
