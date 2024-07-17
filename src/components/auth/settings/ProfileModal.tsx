import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProfileFormProps, signupInputs } from "../../../utils/types";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/redux/app/store";
import { toast } from "react-toastify";
import { editProfile } from "../../../service/api/user/apiMethod";

const ProfileModal: React.FC<ProfileFormProps> = ({
  setShowModal,
  userData,
  setApi,
  api,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupInputs>();

  const user = useSelector((state: RootState) => state.user);
  console.log(user);

  const onSubmit: SubmitHandler<signupInputs> = (payloads) => {
    console.log(payloads, "Form Data with Cropped Image");

    editProfile(user.userId, payloads)
      .then((response) => {
        console.log(response, "kjhfdkfdkj");
        setApi(!api);
      })
      .catch((error) => {
        toast.error(error?.message);
      });

    setShowModal(false);
  };
  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-lg my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Modal Title</h3>
              <button
                className="p-1 ml-auto  float-right text-3xl "
                onClick={() => setShowModal(false)}
              >
                <span className=" text-black h-6 w-6 text-2xl me-6">x</span>
              </button>
            </div>

            <div className="p-6 mx-auto">
              <form
                className="w-full "
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <div className="flex w-full">
                  <div className="">
                    <div className="mb-4">
                      <label className="label" htmlFor="username">
                        Username
                      </label>
                      <input
                        id="username"
                        type="text"
                        defaultValue={userData?.username}
                        placeholder="Enter your name"
                        className="input"
                        {...register("username", {
                          required: {
                            value: true,
                            message: "Username is required",
                          },
                        })}
                      />
                      <p className="text-red-600">{errors.username?.message}</p>
                    </div>
                    <div className="mb-4">
                      <label className="label" htmlFor="email">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={userData?.email}
                        placeholder="Enter your email"
                        className="input"
                        {...register("email", {
                          required: {
                            value: true,
                            message: "Email is required",
                          },
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid email address",
                          },
                        })}
                      />
                      <p className="text-red-600">{errors.email?.message}</p>
                    </div>
                    <div className="mb-4">
                      <label className="label" htmlFor="phone">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="text"
                        value={userData?.phone}
                        placeholder="Enter your phone"
                        className="input"
                        {...register("phone", {
                          required: {
                            value: true,
                            message: "Phone number is required",
                          },
                          pattern: {
                            value: /^\d{10}$/,
                            message: "Invalid phone number",
                          },
                        })}
                      />
                      <p className="text-red-600">{errors.phone?.message}</p>
                    </div>
                    <div className="flex items-center justify-end mt-12 p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-regal-blue authentication_button text-white font-bold uppercase px-6 py-2 text-sm rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
