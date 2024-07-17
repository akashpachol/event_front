import { NavigateFunction, useNavigate } from "react-router-dom";
import { vender } from "../../../utils/types";

const VenderCard: React.FC<{ vender: vender,bookingId:string,status:string }> = ({ vender,bookingId,status }) => {
  const navigate: NavigateFunction = useNavigate();
      

  const handleBooking = () => {
  
    
    navigate('/manager/VenderBooking', {
      state: {
        venderId: vender._id,
        bookingId: bookingId
      }
    });
  }



    return (
      <div className="p-3 py-4 border  hover:shadow-2xl hover:shadow-cyan-500/50">
        <img
          src={vender?.image[0]}
          className="mb-4  transition-transform duration-700 ease-in-out transform hover:scale-105"
          width={300}
          height={200}
          alt={vender?.name}
        />
        <div className="">
  
        </div>
        <div>
        <span className="text-base font-medium mb-2">{vender?.name}</span>
        <p className="font-sm">{vender?.price}</p>
        <span className="font-sm">{vender?.address}</span>
        </div>
        {status=='pending'? (   <button className="manager_button mt-5"onClick={handleBooking}>book now</button>
):(   <p className="manager_button mt-5" >booked</p>
)}
      </div>
    );
  };
  
  export default VenderCard;