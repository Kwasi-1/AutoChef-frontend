import BookingForm from "../components/BookingForm";

const BookingPage = () => {
  return (  
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Book Your Appointment
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please fill out the form below to book your appointment.
          </p>
        </div>
        <BookingForm />
      </div>
    </div>
  );
}

export default BookingPage;
