import React from 'react';

const About = () => {
  return (
    <div className="bg-white text-black font-sans w-11/12 mx-auto">
      <FoundersSection />
      <Section
        title="Your Trusted Auto Shop in Ghana"
        description="At Autochef, we pride ourselves on delivering top-notch automotive services in Ghana. Whether you need a respray, bodywork, mechanical or electrical repairs, or detailed car cleaning, our team of experts is here to ensure your vehicle is in perfect condition."
        features={[
          {
            title: 'Resprays',
            description: 'Our respray services use the highest quality paints and finishes to give your vehicle a fresh, new look. Whether you want to restore its original color or try something new, we\'ve got you covered.',
          },
          {
            title: 'Body Works',
            description: 'From minor dents to major collision repairs, our skilled technicians provide comprehensive bodywork services to restore your vehicle to its best shape.',
          },
          {
            title: 'Mechanical and Electrical Repairs',
            description: 'Our expert mechanics and electricians are equipped to handle all types of automotive repairs, ensuring your vehicle runs smoothly and safely.',
          }
        ]}
      />
      <Section
        title="Our Commitment to Excellence"
        description={[
          "At Autochef, we are dedicated to providing exceptional services to our clients. Our commitment to quality, customer satisfaction, and continuous improvement drives everything we do.",
          "We aim to expand our services and introduce innovative solutions to meet the evolving needs of our customers. Join us as we strive for excellence in the auto repair and maintenance industry."
        ]}
      />
    </div>
  );
};

const Section = ({ title, description, features }) => (
  <section className={`max-w-6xl mx-auto py-16 px-4 `}>
    <h2 className="text-4xl font-semibold mb-8">{title}</h2>
    {Array.isArray(description) ? (
      description.map((desc, index) => (
        <p key={index} className="text-lg text-gray-700 mb-8">
          {desc}
        </p>
      ))
    ) : (
      <p className="text-lg text-gray-700 mb-8">{description}</p>
    )}
    {features && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    )}
  </section>
);

const FeatureCard = ({ title, description }) => (
  <div className=" p-6 rounded-lg">
    <h3 className="text-2xl font-semibold text-red-600 mb-4">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </div>
);

const FoundersSection = () => (
  <section className="py-16 px-8 text-center max-w-2xl mx-auto">
    <p className="text-center text-lg mb-8">
      Founded by automotive enthusiasts Kwame Mensah and Kofi Asante, Autochef was born out of a passion for cars and a commitment to delivering high-quality auto services. With years of experience and a deep understanding of the industry, they set out to create a one-stop shop for all automotive needs in Ghana.
    </p>
    <div className="flex justify-center items-center">
      <img src={require('../assets/CEO.jpg')} alt="Founders" className="shadow-lg w-full h-[60vh] object-cover" />
    </div>
    <p className="mt-8 text-lg text-center">
      Kwame and Kofi believe in the power of hard work and dedication. Their journey from humble beginnings to becoming one of Ghana's most trusted auto shops is a testament to their unwavering commitment to excellence and customer satisfaction.
    </p>
  </section>
);

export default About;
