
import React, { useEffect, useState } from 'react';
import { BentoGrid, BentoGridItem } from './LocationGrid';
import { getLocation } from '../../../service/api/user/apiMethod';
import { toast } from 'react-toastify';
import { location } from '../../../utils/types';

const Location:React.FC = () => {
  const [location, setLocation] = useState<location[]>([]);

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
    <div>
 
            <div className="px-24 bg-gray-100 h-screen py-12">


            <BentoGrid className=" px-10">
        {location?.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.name}
            description={item.description}
            header={item.image}
            className={""}
          />
        ))}
      </BentoGrid>
            </div>


    </div>
  );
}

export default Location;
