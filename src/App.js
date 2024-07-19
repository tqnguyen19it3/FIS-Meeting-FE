import "./App.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Schedule from "./components/Schedule/Schedule";
// import MeetingBookingForm from "./components/Form/MeetingBooking/MeetingBookingForm.JS";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Schedule />
      {/* <MeetingBookingForm /> */}
    </div>
  );
}

export default App;
