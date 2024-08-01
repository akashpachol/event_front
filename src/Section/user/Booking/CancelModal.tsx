import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Swal from "sweetalert2";
import { bookingCancel } from '../../../service/api/user/apiMethod';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute' ,
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

const initialValues = {
    name: '',

};
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Vender Name is required')
        .min(3, 'Vender Name must be at least 3 characters long'),
 
});

export type CancelModalProps = {
    open: boolean;
    toggleButton: () => void;
    id:string|undefined,
    api:boolean,
    setApi:React.Dispatch<React.SetStateAction<boolean>>;
  };


const CancelModal:React.FC<CancelModalProps>=({id,toggleButton,open,api,setApi})=> {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async(values, { resetForm }) => {
          toggleButton()
    const result = await Swal.fire({
      title: "Are you sure to cancel booking?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    });
    if (result.isConfirmed) {
   
      
      bookingCancel(id, values.name)
        .then((response) => {
          if (response.status === "success") {
            console.log('succes');
            setApi(!api)
          } else {
            toast.error(response.message);
          }
        })
        .catch((error) => {
          toast.error(error?.message);
        });
    }
            resetForm();
        },
    });

  return (
    <div>
      <Modal
        open={open}
        onClose={toggleButton}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Cancel Reason</h2>
          <div className="p-4 md:p-5">
                <form className="space-y-4" onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
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
             
             <div className='flex justify-center gap-4'>
             <button type="submit" className="bg-green-600 lg:px-5 py-3 text-white  font-medium rounded-2xl ">submit</button>
             <button type="submit" className="bg-gray-200 text-white  font-medium rounded-2xl   lg:px-5 py-3 "  onClick={(e) => {
    e.preventDefault();
    toggleButton()
  }}>Cancel</button>
             </div>
                  

                </form>
            </div>
        
        </Box>
      </Modal>
    </div>
  );
}

export default  CancelModal