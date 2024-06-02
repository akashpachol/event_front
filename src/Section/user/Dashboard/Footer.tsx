import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="bg-regal-blue grid grid-cols-2 ">
      <div className="mx-24">
        <div className="my-5">
          <h1 className="text-xl font-bold text-white">
            Event Planning Services
          </h1>
          <p className="text-white">
            All Event Vendors | Catering Services | Wedding Planning | Event
            Planning | Birthday Planning | Party Supplies
          </p>
        </div>

        <div className="my-5">
          <h1 className="text-xl font-bold text-white"> More</h1>

          <p className="text-white ">
            Real Events | Photos | Articles | Company Overview | Book Online |
            Why List With VenueLook | Terms & Conditions | Privacy Policy |
            Contact Us | Share Your Feedback
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

          <p className="text-white ">
            VenueLook is India’s most loved Event Planning website! Check
            prices, verified reviews and book best wedding photographers, makeup
            artists, venues, decorators, and all other wedding vendors at
            guaranteed best prices...More about VenueLook
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
