
import React, { useEffect, useState } from 'react';
import { BentoGrid, BentoGridItem } from './VenderGrid';
import { getVender } from '../../../service/api/manager/apiMethod';
import { toast } from 'react-toastify';
import { location } from '../../../utils/types';

const Venders:React.FC = () => {
  const [vender, setVender] = useState<location[]>([]);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    try {
      const response = await getVender();
      if (response && Array.isArray(response.data)) {
        setVender(response.data);
    
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
 
            <div className="px-5 bg-gray-100   py-12">


            <BentoGrid className=" ">
        {vender?.map((item, i) => (
          <BentoGridItem
          item={item}
          />
        ))}
      </BentoGrid>
            </div>


    </div>
  );
}

export default Venders;
