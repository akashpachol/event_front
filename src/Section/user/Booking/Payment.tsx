import React from 'react';
import { paymentEvent } from '../../../service/api/user/apiMethod';
import { toast } from 'react-toastify';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';

const Payment:React.FC = () => {
    const location = useLocation();
    const receivedData = location.state?.data || [];
    const navigate: NavigateFunction = useNavigate();

    
    const handleclick=()=>{
        paymentEvent()
          .then((response) => {
            console.log(response,"bookingHistory");
            
            if (response.status === "success") {
    
              
              toast.success(response.message);
              navigate('/bookingHistory')
            } else {
              toast.error(response.message);
            }
          })
          .catch((error) => {
            toast.error(error?.message);
          });
      }

      return (
        <div className="max-w-4xl mx-auto p-6 sm:p-8 md:p-10 lg:p-12 bg-white">
          <div className="grid gap-8">
            <div className="grid gap-4">
                <div>
                    <img src={receivedData.image} alt="" />
                </div>
              <h1 className="text-3xl font-bold">Your Reservation</h1>
              <div className="grid sm:grid-cols-2 gap-4">
              <div className="grid gap-1">
                  <div className="text-sm font-medium text-muted-foreground">location</div>
                  <div>{receivedData.locationName}</div>
                </div>
                <div className="grid gap-1">
                  <div className="text-sm font-medium text-muted-foreground">Date</div>
                  <div>April 15, 2023</div>
                </div>
                <div className="grid gap-1">
                  <div className="text-sm font-medium text-muted-foreground">Time</div>
                  <div>{receivedData.time}</div>
                </div>
               
                <div className="grid gap-1">
                  <div className="text-sm font-medium text-muted-foreground">Guests</div>
                  <div>{receivedData.count}</div>
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="text-lg font-medium">Subtotal</div>
                <div className="text-lg font-medium">${receivedData.total}</div>
              </div>
              {/* <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-muted-foreground">Coupon Code</div>
                <div className="flex items-center gap-2">
                  <input type="text" placeholder="Enter coupon code" className="max-w-[150px]" />
                  <button className=''>
                    Apply
                  </button>
                </div>
              </div> */}
              <div className="flex items-center justify-between">
                <div className="text-lg font-medium">Total</div>
                <div className="text-lg font-medium">₹{receivedData.total}</div>
              </div>
            </div>
            <div className="grid gap-4">
              
            
              <button  className="w-full authentication_button" onClick={handleclick}>
                Complete Reservation
              </button>
      
            </div>
          </div>
        </div>
      )
    }

export default Payment;
