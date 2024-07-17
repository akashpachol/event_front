import React from 'react';
import {cn } from "../../../animation/cn";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { vender } from '../../../utils/types';


type BentoGridProps = {
  className?: string;
  children?: React.ReactNode;
};
export const BentoGrid:React.FC<BentoGridProps> = ({
    className,
    children,
  }) => {

   
    return (
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-3  gap-10  ",
          className
        )}
      >
     

        {children}
      </div>
    );
  };

  interface BentoGridItemProps {
    item: vender;
 
  }
   
  export const BentoGridItem:React.FC<BentoGridItemProps> = ({item}
 ) => {
    const navigate: NavigateFunction = useNavigate();


    return (
   
        
      <div
      className={cn(
        " rounded-xl group/bento hover:shadow-2xl transition duration-600 shadow-input  p-4   bg-gray-100 border border-transparent justify-between flex flex-col space-y-4",
    
      )}
    >
           {item?.image && (
        <img
          src={item.image[0]}
          className="w-full transition-transform duration-700 ease-in-out transform hover:scale-105"
          alt=""
          height={400}
        />
      )}
        <div className="group-hover/bento:translate-x-2 transition duration-200 flex justify-between">
      <div>
      <div className="font-sans font-bold text-neutral-600  mb-2 mt-2">
      {item.name}
          </div>
          <div className="font-sans font-semibold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
            { item.price}
          </div>
          <div className="font-sans font-normal text-neutral-600 text-xs ">
          {item.description}
          </div>
      </div>
      <div>
        <button className='authentication_button' onClick={()=>navigate('/manager/VenderDetails',{state:item._id})}>view</button>
      </div>
        
        </div>
      </div>
 

    );
  };
