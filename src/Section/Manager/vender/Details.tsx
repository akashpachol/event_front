
import { useLocation } from "react-router-dom";
import { LayoutGrid } from "./LayoutGrid";
import { useCallback, useEffect, useState } from "react";
import {
  ApiResponseLocation,


  vender,
} from "../../../utils/types";
import {  getVenderDetails } from "../../../service/api/manager/apiMethod";
import { toast } from "react-toastify";


const Details:React.FC = () => {
  const [venderData, setVenderData] = useState<vender | null>(null);

  const location = useLocation();
  const receivedData = location.state;
  console.log(receivedData,"receivedData");
  
  const getDetails = useCallback(() => {
    getVenderDetails(receivedData)
      .then((response: ApiResponseLocation) => {
        if (response.data) {
          setVenderData(response.data as vender);
        } else {
          toast.error("No location data found");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [receivedData]);

  useEffect(() => {
    getDetails();
  }, [getDetails]);

  const [state, setState] = useState<
    { id: number; thumbnail: string; className: string }[]
  >([]);

  useEffect(() => {
    if (venderData?.image) {
      const cards = venderData.image.slice(0, 4).map((value, index) => ({
        id: index + 1,
        thumbnail: value,
        className:
          index == 0 ? "md:row-span-2 col-span-2" : "row-span-1 col-span-1",
      }));
      setState(cards);
 
    }
  }, [venderData]);
console.log(venderData,"vender");

  return (
    <div className="  py-20  w-full bg-white">
      <div className="h-96">
        <LayoutGrid cards={state} />
      </div>

      <div className="card mt-5 mx-20 px-10 border flex">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Name
              </th>

              <td className="px-6 py-4">{venderData?.name}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Address
              </th>

              <td className="px-6 py-4 break-words">
                {venderData?.address},{venderData?.state}
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                description
              </th>

              <td className="px-6 py-4">{venderData?.description}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                price
              </th>

              <td className="px-6 py-4">{venderData?.price}</td>
            </tr>
      

           
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Details;
