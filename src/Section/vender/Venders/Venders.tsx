import React, { useEffect, useState } from 'react';


import { BentoGrid, BentoGridItem } from "./Animation/Card";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { RootState } from '../../../utils/redux/app/store';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { location } from '../../../utils/types';
import { getAllVenderwithId } from '../../../service/api/vender/apiMethod';


const Venders:React.FC=()=> {
    const navigate: NavigateFunction = useNavigate();
    const [locationData, setLocationData] = useState<location[]>([]);
  const vender = useSelector((state: RootState) => state.vender);
  useEffect(() => {
    getDetails()

  }, [vender.venderId]);
    const getDetails=()=>{
        getAllVenderwithId(vender.venderId)
        .then((response) => {
            if (response && Array.isArray(response.data)) {
                setLocationData(response.data);
              
              } else {
                toast.error("No user data found");
              }
        })
        .catch((error) => {
          toast.error(error.message);
        });
      }




  return (
    <div className=''>
        <div className='flex justify-end me-16 my-5'><button className='user_button'onClick={()=>navigate('/vender/addvenders')}>Add Vender</button></div>
    <BentoGrid className="w-full px-10">
        
        {locationData?.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.name}
            description={item.description}
            header={item.image}
         
            className={ "h-48" }
          />
        ))}
      </BentoGrid>
    </div>

  );
}





export default Venders;
