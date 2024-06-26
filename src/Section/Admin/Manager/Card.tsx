import React from 'react';
import {cn } from "../../../animation/cn";
import { verifyLocation } from '../../../service/api/admin/apiMethod';
import { toast } from 'react-toastify';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

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

  interface Header {
    url: string;
  }
   
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
    header?: Header[];
    verify:string;
    id:string
  }) => {


    const navigate: NavigateFunction = useNavigate();
    const handleVerifyLocation=(id:string)=>{
      Swal.fire({
        title: "Are you sure to verify location?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then((result) => {
        if (result.isConfirmed) {
    
          verifyLocation(id)
          .then((response) => {
            console.log(response);
            navigate('/admin/manager')
          })
          .catch((error) => {
            toast.error(error?.message);
          });
        }
      });



    }


    return (
   
        
      <div
        className={cn(
          " rounded-xl group/bento hover:shadow-2xl transition duration-600 shadow-input  p-4   border border-transparent justify-between flex flex-col space-y-4",
          className
        )}
      >
           {header && header.length > 0 && (
        <img
          src={header[0].url}
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
       {!verify?<button className='bg-red-500' onClick={()=>handleVerifyLocation(id)} >verify</button>:(<p className='bg-green-500' >verified</p>)} 
      </div>
        
        </div>
      </div>
 

    );
  };
