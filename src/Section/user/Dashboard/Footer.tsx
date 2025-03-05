import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="bg-regal-blue mt-10 ">

<div className=" grid grid-cols-2 ">
      <div className="mx-24">
        <div className="my-5">
          <h1 className="text-xl font-bold text-white">
            Event Planning Services
          </h1>
          <p className="text-white mt-5">
            All Event Vendors | Catering Services | Wedding Planning | Event
            Planning | Birthday Planning | Party Supplies|Real Events | Photos |
          
            Feedback
          </p>
        </div>
        <div className="my-5">
          <h1 className="text-xl font-bold text-white"> Contact Info</h1>

          <p className="text-white ">+91-8470804805 events@venuelook.com</p>
        </div>
      </div>
      <div className="mx-24">
        <div className="my-5">
          <h1 className="text-xl font-bold text-white"> Contact Info</h1>

          <p className="text-white mt-5">
            VenueLook is India’s most loved Event Planning website! Check
            prices, verified reviews and book best wedding photographers, makeup
            artists, venues, decorators, and all other wedding vendors at
            guaranteed best prices...More about VenueLook
          </p>
        </div>
      </div>
    </div>
      <footer className="border-t-2 rounded-lg shadow m-4 ">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-white sm:text-center">
          © 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white sm:mt-0">
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">About</a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
          </li>
          <li>
            <a href="#" className="hover:underline">Contact</a>
          </li>
        </ul>
      </div>
    </footer>
    </div>

  );
};

export default Footer;
