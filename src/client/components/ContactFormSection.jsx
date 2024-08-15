import mechanicImage from '../assets/mechanic-image.png'; 

// ContactUsForm component renders a form for users to get a location-based car repair estimate
const ContactUsForm = () => {
  return (
    <section className="relative h-screen flex items-center my-24">
      {/* Background image of a mechanic working under a car */}
      <img src={mechanicImage} alt="Mechanic working under a car" className="absolute inset-0 w-full md:w-3/4 h-full object-cover z-0" />
      
      {/* Form container */}
      <div className="relative bg-white p-6 md:p-8 lg:p-10 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/3 z-10 lg:mr-24 mx-auto">
        <h2 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-8 text-center md:text-left">Get A Location-Based Car Repair Estimate</h2>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Name input field */}
            <div className="mb-4 md:mb-0">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Your name"
              />
            </div>
            
            {/* Email input field */}
            <div className="mb-4 md:mb-0">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="you@company.com"
              />
            </div>
            
            {/* Phone number input field */}
            <div className="mb-4 md:mb-0">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                Your Phone Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="text"
                placeholder="Number"
              />
            </div>
            
            {/* Service selection dropdown */}
            <div className="mb-4 md:mb-0">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="service">
                Service
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="service"
              >
                <option>--Select Service--</option>
                <option>Automobile resprays</option>
                <option>Auto Electrical</option>
                <option>Car Detailing</option>
                <option>Paint Correction</option>
                <option>Body Works</option>
                <option>Auto Mechanic</option>
              </select>
            </div>
          </div>
          
          {/* Message text area */}
          <div className="mt-4 md:mt-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
              How can we help?
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              placeholder="Tell us a little about the project..."
              rows="4"
            ></textarea>
          </div>
          
          {/* Submit button */}
          <div className="mt-6 text-center md:text-left">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Make An Appointment
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactUsForm;
