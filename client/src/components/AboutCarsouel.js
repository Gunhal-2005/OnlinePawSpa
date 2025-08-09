import React from "react";
import { Accordion } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AboutAccordion = () => {
  const items = [
    {
      title: "Convenience at Your Doorstep",
      description:
        "No more long drives or waiting in crowded salons. Our fully-equipped grooming van comes to you!",
    },
    {
      title: "Stress-Free & Personalized Grooming",
      description:
        "With one-on-one attention, we create a calm, safe, and hygienic environment tailored to your pet’s needs.",
    },
    {
      title: "Experienced & Caring Groomers",
      description:
        "Our team of certified professionals is passionate about keeping your pets looking and feeling their best.",
    },
    {
      title: "Premium & Pet-Friendly Products",
      description:
        "We use only gentle, high-quality shampoos and grooming tools to ensure a healthy and happy experience for your pets.",
    },
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-3xl font-bold text-center mb-6">About PawSpa</h2>
      <Accordion flush>
        {items.map((item, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header>{item.title}</Accordion.Header>
            <Accordion.Body>{item.description}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default AboutAccordion;