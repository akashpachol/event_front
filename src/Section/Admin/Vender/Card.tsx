import React from 'react';
import {cn } from "../../../animation/cn";
import {  verifyVender } from '../../../service/api/admin/apiMethod';
import { toast } from 'react-toastify';
import { NavigateFunction, useNavigate } from 'react-router-dom';

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
          "grid grid-cols-1 md:grid-cols-3  gap-4 w-full ",
          className
        )}
      >
     

        {children}
      </div>
    );
  };
   
  export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    verify,
    id
  }: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: object;
    verify:string;
    id:string
  }) => {
    const navigate: NavigateFunction = useNavigate();
    const handleVerifyVender=(id:string)=>{
console.log(id);

verifyVender(id)
.then((response) => {
  console.log(response);
navigate('/admin/vender')
})
.catch((error) => {
  toast.error(error?.message);
});

    }


    return (
   
        
      <div
        className={cn(
          " rounded-xl group/bento hover:shadow-2xl transition duration-600 shadow-input  p-4   bg-gray-100 border border-transparent justify-between flex flex-col space-y-4",
          className
        )}
      >
           {header && (
        <img
          src={header[0]}
          className="w-full transition-transform duration-700 ease-in-out transform hover:scale-105"
          alt=""
          height={400}
        />
      )}
        <div className="group-hover/bento:translate-x-2 transition duration-200 flex justify-between">
      <div>
      <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
            {title}
          </div>
          <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
            {description}
          </div>
      </div>
      <div>
       {!verify?<button className='bg-red-500' onClick={()=>handleVerifyVender(id)} >verify</button>:(<p className='bg-green-500'>verified</p>)} 
      </div>
        
        </div>
      </div>
 

    );
  };
