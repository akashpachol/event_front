import React, {  useState } from 'react';
import { Animi } from '../../../animation/Animi';
import { useDispatch, useSelector } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { DevTool } from '@hookform/devtools';
import { toast } from 'react-toastify';
import { ApiResponse, signupInputs } from '../../../utils/types';
import { postLogin } from '../../../service/api/admin/apiMethod';
import { loginSuccess } from '../../../utils/redux/slice/Auth/AdminAuthSlice';



const Login:React.FC = () => {

  const dispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { register, handleSubmit, control, formState } =
  useForm<signupInputs>();
const { errors } = formState;


  const PasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

//   useEffect(() => {
//     if(!user.token){
//       navigate('/login')
//     }else{
//       navigate('/')
//     }
//     }, [user.token, navigate]);

    const onSubmit: SubmitHandler<signupInputs> = (payloads) => {
      postLogin(payloads)
        .then((response: ApiResponse) => {
          if (response.status === "success") {
            console.log(response,"response");
            
            toast.success(response.message);
            dispatch(loginSuccess({ user: response }));
            navigate("/admin");
          } else {
            toast.error(response.message);
          }
        })
        .catch((error) => {
          toast.error(error?.message);
        });
    };
  
  return (
    <Animi>
      <div className="absolute z-50 inset-0 flex items-center justify-center ">
        <div className="flex p-10 items-center justify-center bg-gray-100 px-4 ">
          <div className="w-full max-w-md  space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-black tracking-tight">Admin Login</h1>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Enter your email and password below to access your account.
              </p>
            </div>
            <div className="bg-white shadow rounded-lg p-6 ">
            <form
          className="w-full max-w-sm"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <DevTool control={control} placement="top-left" />
          <div className="mb-4">
            <label className="label" htmlFor="email">
              email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your mail"
              className="input"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
            />
            <p className="text-red-600">{errors.email?.message}</p>
          </div>
          <div className=" relative mb-4">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="input"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <button
              type="button"
              onClick={PasswordVisibility}
              className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-gray-700"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            <p className="text-red-600">{errors.password?.message}</p>
          </div>

          <button type="submit" className="bg-regal-blue authentication_button">
            log in
          </button>
        </form>
            </div>
      
          </div>
        </div>
      </div>
    </Animi>
  )
}

export default Login;
