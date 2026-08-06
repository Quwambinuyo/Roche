import React from "react";
import Reveal from "../Landing/Reveal";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

const Contact = () => {
  return (
    <div className="">
      <Reveal className="mb-10">
        <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase">
          Get in Touch
        </p>
        <h1 className="font-bold text-2xl md:text-3xl text-secondary mt-2">
          Contact Us
        </h1>
        <p className="text-sm text-secondary/60 mt-3 max-w-md">
          Questions about fit, fabric, or an order. we usually reply within a
          day.
        </p>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-10 md:gap-14">
        <ContactForm />
        <ContactInfo />
      </div>
    </div>
  );
};

export default Contact;
