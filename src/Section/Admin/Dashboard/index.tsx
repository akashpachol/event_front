
import { useEffect, useState } from "react";
import AdminStats from "../../../components/Admin/AdminStats";
import ApexChart from "../../../components/Admin/ApexChart";
import { geAllManager } from "../../../service/api/admin/apiMethod";
import { ApiResponse, userDataTypes } from "../../../utils/types";
import { toast } from "react-toastify";

const Dashboard:React.FC=()=> {
const [userDetails,setuserDetails]=useState<userDataTypes[]|[]>([])
    useEffect(() => {
      
          getDetails();
        
      }, []);
    
      const getDetails = () => {
        geAllManager()
          .then((response: ApiResponse) => {
    console.log(response,'dgsgd');
    
            if (response.data) {
                setuserDetails(response.data as userDataTypes[]);
            } else {
              toast.error("No location data found");
            }
          })
          .catch((error) => {
            toast.error(error.message);
          });
      };

  return (
    <div className=" w-full ">
    <AdminStats />
    <div className=" lg:flex ">
    <ApexChart />
    <div className="my-10 mx-16">
    <h5 className="text-xl font-bold dark:text-white">Recent Managers</h5>


    {userDetails?.map((value) => {
    const updatedAtDate = new Date(value.updatedAt as Date);
    const options:{year:string,month:string} = { year: 'numeric', month: 'long' };
    const formattedDate = updatedAtDate.toLocaleDateString('en-US', options as object);

    return (
        <div className="flex items-center gap-4 mt-8" key={value.username}>
            <img
                className="w-10 h-10 rounded-full"
                src={value.image ? value.image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-gka0l1ZzNvolZQoaOUCZLAegXtk_mom0DA&s"}
                alt=""
            />
            <div className="font-medium">
                <div>{value.username}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Joined in {formattedDate}</div>
            </div>
        </div>
    );
})}




    </div>
    </div>
   
   </div>
  );
}

export default Dashboard;
