import React, { useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { RootState } from '../../../utils/redux/app/store';
import {  getAllVenderType } from '../../../service/api/admin/apiMethod';
import { toast } from 'react-toastify';
import { venderType } from '../../../utils/types';
import { addVender } from '../../../service/api/vender/apiMethod';

const initialValues = {
    name: '',
    description: '',
    address: '',
    state: '',
    type: '',
    price: '',
  image: []
};

const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('vender Name is required')
      .min(3, 'vender Name must be at least 3 characters long'),
    description: Yup.string()
      .required('Description is required')
      .min(5, 'Description must be at least 5 characters long'),
    address: Yup.string().required('Address is required'),
    state: Yup.string().required('State is required'),
    type: Yup.string().required('Event Type is required'),
    price: Yup.number()
      .required('Regular price is required')
      .positive('Price must be positive')
      .integer('Price must be an integer'),
  image: Yup.array()
    .min(1, 'At least one image file is required')
    .of(
      Yup.object().shape({
        url: Yup.string().required(),
        type: Yup.string().oneOf(['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/tiff', 'image/svg+xml']).required(),
      })
    ),
});

const AddVenders: React.FC = () => {
  const [venderTypeData, setVenderTypeData] = useState<venderType[]>([]);
  const venderData = useSelector((state: RootState) => state.vender);
  useEffect(() => {
      getDetails();
    }, []);
  
    const getDetails = async () => {
      try {
        const response = await getAllVenderType();
        if (response && Array.isArray(response.data)) {
          setVenderTypeData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const data = {
        ...values,
        vender: venderData.venderId,
      };
      console.log(data);
 
      addVender(data)
          .then((response) => {
            if (response.status === 'success') {
              toast.success(response.message);
            } else {
              toast.error(response.message);
            }
          })
          .catch((error) => {
            toast.error(error?.message);
          });
      resetForm();
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const uploadedImages = formik.values.image.slice(); 
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', 'mycloud');
          formData.append('folder', 'images');

          fetch('https://api.cloudinary.com/v1_1/dp4edf7uw/image/upload', {
            method: 'POST',
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              const imageUrl:string = data.secure_url;
              const newImage = { url: imageUrl, type: file.type };

              uploadedImages.push(newImage);
              formik.setFieldValue('image', uploadedImages);
            })
            .catch((error) => {
              console.error('Error uploading image to Cloudinary:', error);
            });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <section className="content-main p-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex space-x-10 flex-wrap">
          <div className="w-full lg:w-9/12 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Add New Venders</h2>
            </div>
          </div>
          <div className="w-full lg:w-7/12 mb-4">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="mb-4">
                                <h4 className="text-xl font-semibold">Basic</h4>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700">vender Name</label>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="input"
                                    id="name"
                                    {...formik.getFieldProps('name')}
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <div className="text-red-500">{formik.errors.name}</div>
                                ) : null}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-gray-700">Description</label>
                                <textarea
                                    placeholder="Type here"
                                    className="input"
                                    id="description"
                                    {...formik.getFieldProps('description')}
                                />
                                {formik.touched.description && formik.errors.description ? (
                                    <div className="text-red-500">{formik.errors.description}</div>
                                ) : null}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="address" className="block text-gray-700">Address</label>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="input"
                                    id="address"
                                    {...formik.getFieldProps('address')}
                                />
                                {formik.touched.address && formik.errors.address ? (
                                    <div className="text-red-500">{formik.errors.address}</div>
                                ) : null}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label htmlFor="state" className="block text-gray-700">State</label>
                                    <input
                                        type="text"
                                        placeholder=""
                                        className="input"
                                        id="state"
                                        {...formik.getFieldProps('state')}
                                    />
                                    {formik.touched.state && formik.errors.state ? (
                                        <div className="text-red-500">{formik.errors.state}</div>
                                    ) : null}
                                </div>
                                <div className="mb-4">
                  <label htmlFor="type" className="block text-gray-700">vender Type</label>
                  <select 
                    id="type" 
                    className="input" 
                    {...formik.getFieldProps('type')}
                  >
                    <option value="">Select Event Type</option>
                    {venderTypeData?.map((value)=>(
    <option value={value._id}>{value.name}</option>
                    ))}
                   
              
                  </select>
                  {formik.touched.type && formik.errors.type ? (
                    <div className="text-red-500">{formik.errors.type}</div>
                  ) : null}
                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor='price'>Regular price</label>
                  <input placeholder="" type="number" className="input"
                    {...formik.getFieldProps('price')} 
                  />
                  {formik.touched.price && formik.errors.price ? (
                    <div className="text-red-500">{formik.errors.price}</div>
                  ) : null}
                </div>
          
              </div>
                        </div>
                    </div>

          <div className="w-full lg:w-4/12 mb-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="input-upload">
                {formik.values.image.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4 max-h-80 overflow-y-auto">
                    {formik.values.image.map((img, index) => (
                      <div key={index} className="relative">
                        <img src={img.url} alt={`Uploaded ${index}`} className="w-full h-48 rounded" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <img src="assets/imgs/theme/upload.svg" alt="Upload Icon" className="mb-4" />
                )}
                <div className='mt-5'>
                  <label
                    htmlFor='image'
                    className="bg-blue-500 text-white rounded font-sm px-4 py-2 hover:bg-blue-600 my-5"
                  >
                    Choose File
                  </label>
                  <input
                    className="hidden"
                    id="image"
                    type="file"
                    multiple
                    onChange={handleImageUpload}
                  />
                </div>
                {formik.errors.image && formik.touched.image && (
                  <div className="text-red-500 text-sm">{formik.errors.image}</div>
                )}
              </div>
              <div className='mt-5'>
                <button className="bg-white border border-gray-300 rounded font-sm mr-5 text-gray-700 px-4 py-2 hover:bg-gray-100">
                  Cancel
                </button>
                <button type="submit" className="manager_button">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default AddVenders;
