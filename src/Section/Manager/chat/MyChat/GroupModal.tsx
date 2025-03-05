import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { groupChat, searchData } from '../../../../service/api/manager/apiMethod';
import { toast } from 'react-toastify';
import { userDataTypes } from '../../../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../utils/redux/app/store';
import { useSocket } from '../../../../utils/context/SocketContext';
import { chatAdd } from '../../../../utils/redux/slice/chatSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const initialValues:{name:string,users:[],userId:string} = {
  name: '',
  users: [],
  userId:''
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required(' Name is required')
    .min(3, ' Name must be at least 3 characters long'),
});

export type CancelModalProps = {
  open: boolean;
  toggleButton: () => void;
  setApi:React.Dispatch<React.SetStateAction<boolean>>;
  api:boolean
};

const GroupModal: React.FC<CancelModalProps> = ({api,setApi, toggleButton, open }) => {
  const [searchResult, setSearchResult] = useState<userDataTypes[]>([]);
  const manager = useSelector((state: RootState) => state.manager);
  const { socket } = useSocket();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if(!manager.managerId)return

        values={...values,userId:manager.managerId}

      try {
       
        const response = await groupChat(values);
        if (response.data) {
          socket?.emit("join chat", response.data?._id);
          dispatch(chatAdd({ data: response.data }))
          toggleButton();
          setApi(!api)
          resetForm();
        }
      } catch (error) {
        const errorMessage = (error as Error).message;
        toast.error(errorMessage);
      }
    },
  });

  const handleGroup = (userToAdd: userDataTypes) => {
    if (formik.values.users.find((user) => user._id === userToAdd._id)) {
      return;
    }
    formik.setFieldValue('users', [...formik.values.users, userToAdd]);
  };

  const handleSearch = async (query: string) => {
    try {
      if (!query||!manager.managerId) {
        return;
      }


      const response = await searchData(query,'admin',manager.managerId);
      if (response && Array.isArray(response.data)) {
        setSearchResult(response.data);
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(errorMessage);
    }
  };

  const handleDelete = (userId: string) => {
    formik.setFieldValue(
      'users',
      formik.values.users.filter((user) => user._id !== userId)
    );
  };




  return (
    <div>
      <Modal
        open={open}
        onClose={toggleButton}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Create Group Chat</h2>
          <div className="p-4 md:p-5">
            <form className="space-y-4" onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label htmlFor="">Group Name</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input"
                  id="name"
                  {...formik.getFieldProps('name')}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="error">{formik.errors.name}</div>
                ) : null}
              </div>

              <div className="mb-4">
                <label htmlFor="">users</label>
                <input
                  type="text"
                  placeholder="Search users"
                  className="input"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <div className="selected-users">
                {formik.values.users.map((user: userDataTypes) => (
                 

                  <span 
                  key={user._id}
                 
                  className="bg-blue-100 mb-4 text-blue-800 text-xs font-medium me-2 px-2.5 py-1.5 rounded dark:text-blue-400 border border-blue-400"
                >
                {user.username}, {user.role}
                  <span className="inline-flex items-center cursor-pointer justify-center w-5 h-5 ms-1  text-xs font-semibold text-white bg-red-500 rounded-full" onClick={()=>handleDelete(user._id)}>
                    x
                  </span>
                </span>
                ))}
              </div>

              {searchResult?.slice(0, 4).map((user: userDataTypes) => (
              

                <div
                onClick={() => handleGroup(user)}
                className="cursor-pointer bg-gray-300 hover:bg-teal-500 hover:text-white w-full flex items-center text-black px-3 py-2 mb-2 rounded-lg"
              >
                <img
                  className="mr-2 w-8 h-8 rounded-full"
                  alt={user.username}
                  src={user.image}
                />
                <div>
                  <p>{user.username}</p>
                  <p className="text-xs">
                    <strong>Role: </strong>
                    {user.role}
                  </p>
                </div>
              </div>
              ))}

             

              <div className="flex justify-center gap-4">
                <button
                  type="submit"
                  className="bg-green-600 lg:px-5 py-3 text-white font-medium rounded-2xl"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="bg-gray-200 text-black font-medium rounded-2xl lg:px-5 py-3"
                  onClick={toggleButton}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default GroupModal;


