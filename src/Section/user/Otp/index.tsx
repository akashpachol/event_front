import React, { useRef, useState, useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { ApiResponse, OtpInputs } from "../../../utils/types";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postOTP, resendOtp } from "../../../service/api/user/apiMethod";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../utils/redux/slice/Auth/UserAuthSlice";
import { RootState } from "../../../utils/redux/app/store";
import { useLocation } from "react-router-dom";
const Otp: React.FC = () => {
  const dispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const user = useSelector((state: RootState) => state.user);
  console.log(user);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const { handleSubmit, control, setValue } = useForm<OtpInputs>();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.currentTarget.value;
    if (e.key === "Backspace" && value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
      setValue(`otp${index}` as keyof OtpInputs, "");
    }
  };

  const onSubmit: SubmitHandler<OtpInputs> = (data) => {
    console.log("OTP values:", data);
    const otp = data.otp1 + data.otp2 + data.otp3 + data.otp4;
    console.log(otp);

    postOTP({ otp: otp })
      .then((response: ApiResponse) => {
        console.log(response, "kkkk");

        if (response.status === "success") {
          toast.success(response.message);
          dispatch(loginSuccess({ user: response }));
          navigate("/");
        } else {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  // Timer State and Logic
  const initialTimer = parseInt(localStorage.getItem("otpTimer") || "60");
  const [timer, setTimer] = useState<number>(initialTimer);
  const [resend, setResend] = useState<boolean>(false);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => {
          const newTimer = prevTimer - 1;
          localStorage.setItem("otpTimer", newTimer.toString());
          return newTimer;
        });
      } else {
        clearInterval(countdownInterval);
        setResend(true);
        toast.error("Time expired please resend otp");
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [timer]);

  const startResendTimer = () => {
    console.log(email);

    resendOtp({ email: email })
    .then((response: ApiResponse) => {
      console.log(response, "kkkk");
    })
    .catch((error) => {
      toast.error(error?.message);
    });
    
    setResend(false);
    setTimer(60);
    localStorage.setItem("otpTimer", "60");


  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };



  return (
    <div>
      <div className="w-full flex md:flex-row">
        <div className="authentication_div_1 bg-regal-blue">
          <div className="w-1/2 p-6 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">New Here!</h1>
            <p className="text-white mb-4">
              Signin up and discover a great amount of new opportunities
            </p>
            <button
              type="submit"
              className="authentication_button2"
            >
              Sign up
            </button>
          </div>
        </div>
        <div className="authentication_div_2">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Create an account
          </h1>
          <form
            className="w-full max-w-sm"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="mb-6">
              <label className="label" htmlFor="otp">
                Otp
              </label>
              <div className="grid grid-cols-4 gap-4 mb-4">
                {inputRefs.map((ref, index) => (
                  <Controller
                    key={index}
                    name={`otp${index + 1}` as keyof OtpInputs}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="input"
                        maxLength={1}
                        ref={ref}
                        onChange={(e) => {
                          field.onChange(e);
                          handleInputChange(e, index);
                        }}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                      />
                    )}
                  />
                ))}
              </div>
            </div>
            <div className="mb-6">
              <p className="text-red-500">
                {timer > 0
                  ? `Time remaining: ${formatTime(timer)}`
                  : "OTP has expired. Please request a new one."}
              </p>
            </div>
            <button
              type="submit"
              className="bg-regal-blue authentication_button"
              disabled={timer <= 0}
            >
              Submit
            </button>

            
            {resend && (
            


<button
  type="button"
  onClick={startResendTimer}
  className="authentication_button2"
>
Resend OTP
</button>

            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Otp;
