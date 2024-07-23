import "./App.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Calendar from "./pages/CalendarView/components/Calendar/Calendar";
import Sidebar from "./pages/CalendarView/components/SideBar/SideBar";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <div className="flex min-h-screen">
        <Sidebar />
        <Calendar />
      </div>
    </div>
  );
}

export default App;
