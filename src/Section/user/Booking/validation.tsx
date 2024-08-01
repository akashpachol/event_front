
import * as Yup from 'yup';



export const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters long"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^[0-9]{10}$/, "Phone must be exactly 10 digits"),
    event: Yup.string()
      .required("Event is required"),
    count: Yup.number()
      .required("Count is required")
      .positive("Count must be a positive number")
      .integer("Count must be an integer"),
  
    date: Yup.date()
      .required("Date is required"),
    time: Yup.string()
      .required("Time is required"),
    service: Yup.array().of(Yup.string())
      .required("At least one service is required"),
  });

  
  export const initialValues = {
    name: '',
    phone: '',
    event: '',
    count: '',
    date: '',
    time: '',
    service: [],
    manager: '',
    locationData: '',
    user: '',
  };
  