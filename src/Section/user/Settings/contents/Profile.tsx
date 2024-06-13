import React, { useEffect, useState } from 'react';
import profileicon from '../../../../assets/icons/space-default.webp'
import { useSelector } from 'react-redux';
import { RootState } from '../../../../utils/redux/app/store';
import { getUserDeatails } from '../../../../service/api/user/apiMethod';
import { toast } from 'react-toastify';
import { userDataTypes } from '../../../../utils/types';
import Modal from './cropper/Modal';
import ProfileModal from './ProfileModal';

const Profile:React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);

    const [userData, setUserData] = useState<userDataTypes | null>(null);
    const [api, setApi] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    getDetails()

  }, [api,user.user]);
  const getDetails=()=>{
    getUserDeatails(user.userId)
    .then((response:any) => {
      if (response && response.data) {
        console.log(response.data);
        
        setUserData(response.data);
      } else {
        toast.error("No user data found");
      }
    })
    .catch((error) => {
      toast.error(error.message);
    });
  }





  return (
    <>

<div
  className="w-full  pt-5 border-2"
  style={{ background: 'linear-gradient(to right, rgb(165 243 255), rgb(224 252 255 / 26%))' }}
>

        <div className="flex items-center gap-4  py-8 px-16 border-b-2">
    <img className="w-48 h-48 rounded-full"  onClick={() => setShowModal(true)}  src={userData?.image?userData.image:profileicon} alt="" />
    <div className="font-large dark:text-white">
        <div>Hi {userData?.username}</div>
        <div className="text-lg text-gray-500 dark:text-gray-400">welcome to EventPortal!</div>
        <div className="flex mt-3">
  <button className="authentication_button  h-8 pt-1" onClick={() => setShowModal1(true)}  >Edit Profile</button>
</div>
    </div>
</div>


<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
  
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Name
                </th>
                
                <td className="px-6 py-4">
                {userData?.username}
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Email
                </th>
              
                <td className="px-6 py-4">
                {userData?.email}
                </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Phone Number
                </th>
                
                <td className="px-6 py-4">
                {userData?.phone}
                </td>
            </tr>
        </tbody>
    </table>
</div>

     
      
    </div>

    {showModal1 ? (
        <>
       <ProfileModal setShowModal={setShowModal1} userData={userData} setApi={setApi} api={api}/>
       
        </>
      ) : null}




{showModal ? (
        <>
          <Modal setShowModal={setShowModal} />
        </>
      ) : null}
    
    </>

  );
}




export default Profile;
