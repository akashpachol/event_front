import React, { useEffect, useState } from 'react';
import { bookingService, getVenderDetails } from '../../../service/api/manager/apiMethod';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { ApiResponseLocation, serviceBooking, vender } from '../../../utils/types';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../../../utils/redux/app/store';
import { useFormik } from "formik";
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters long"),
  event: Yup.string()
    .required("Event is required"),
  count: Yup.number()
    .required("Count is required")
    .positive("Count must be a positive number")
    .integer("Count must be an integer"),
  date: Yup.date()
    .required("Date is required"),
});



const VenderBooking: React.FC = () => {
  const [venderData, setVenderData] = useState<vender | null>(null);
  const location = useLocation();
  const receivedData = location.state.venderId;
  const bookingData = location.state.receivedData;
  const event = useSelector((state: RootState) => state.event);
  const manager = useSelector((state: RootState) => state.manager);
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = () => {
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
  };

  const initialValues = {
    name: bookingData.name||'',
    event:bookingData.event._id|| '',
    count: bookingData.count||'',
    date:bookingData.date ? new Date(bookingData.date).toISOString().substr(0, 10) : '',
    manager: '',
    vender: '',
  };
console.log(initialValues,'jhkjghj');

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {

      const data:serviceBooking = {
        ...values,
   
        venderData: venderData?._id,
        manager: manager.managerId,
        vender: venderData?.vender?._id,
        status: 'pending',
        bookingData:bookingData._id
      };
  
      bookingService(data)
      .then((response) => {
        if (response.status === 'success') {
          toast.success(response.message);
          navigate('/manager/UserBookingDetails')
        } else {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });
      formik.resetForm();
    },
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 sm:py-16 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <div className="flex flex-col gap-4">
            {venderData?.image && (
              <img
                src={venderData.image[0]}
                alt="Service"
                className="rounded-lg object-cover aspect-[3/2]"
              />
            )}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">{venderData?.name}</h1>
              <p className='text-lg'>Price: {venderData?.price}</p>
              <p className="text-muted-foreground text-lg">
                {venderData?.description}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-muted rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Book {venderData?.name}</h2>
          <form className="grid gap-4" onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div className="mb-4">
                <label className="label" htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  className="input"
                  placeholder="Enter the name"
                  {...formik.getFieldProps('name')}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-600">{formik.errors.name as string}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="label" htmlFor="event">Event</label>
                <select
                  id="event"
                  className="input"
                  {...formik.getFieldProps('event')}
                >
                  <option value="" label="Select event" />
                  {event?.data?.map((value) => (
                    <option key={value._id} value={value._id} label={value.name} />
                  ))}
                </select>
                {formik.touched.event && formik.errors.event ? (
                  <div className="text-red-600">{formik.errors.event as string}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="label" htmlFor="count">Count</label>
                <input
                  id="count"
                  type="text"
                  className="input"
                  placeholder="Enter the count"
                  {...formik.getFieldProps('count')}
                />
                {formik.touched.count && formik.errors.count ? (
                  <div className="text-red-600">{formik.errors.count as string}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="label" htmlFor="date">Date</label>
                <input
                  id="date"
                  type="date"
                  className="input"
                  {...formik.getFieldProps('date')}
                />
                {formik.touched.date && formik.errors.date ? (
                  <div className="text-red-600">{formik.errors.date}</div>
                ) : null}
              </div>
            </div>
            <button type="submit" className="w-full manager_button">
              Book Service
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VenderBooking;
