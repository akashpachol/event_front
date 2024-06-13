import React from 'react';

import { Link } from 'react-router-dom';
import { profileData } from '../../../utils/Contents';
import Profile from './contents/Profile';

const Settings:React.FC = () => {


  return (
<div
  className="min-h-screen flex flex-col  "
 
>     
        <div className='flex-grow flex justify-center items-center lg:px-48'>
        <div className='w-1/3 '>
        <div className=" flex flex-col   hover:w-64 md:w-64 bg-white  text-gray-600 ">
    <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
      <ul className="flex flex-col  space-y-1">
       
       {profileData.map((profile)=>(
  <li>
  <Link to="#" className="relative flex flex-row items-center h-11 hover:bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600    dark:focus:ring-cyan-800 border-2 ">
  
    <span className="inline-flex justify-center items-center ml-4">
      <i className="fas fa-users"></i>
    </span>
    <span className="ml-2 text-sm tracking-wide truncate">{profile.name}</span>
  </Link>
</li>
       ))}
      
               
       
       
        
       
      </ul>
    </div>
  </div>
            </div>
            <div className='sm:w-2/3 w-96 '>
                <Profile />
            </div>
        </div>
      
    </div>
  );
}

export default Settings;
