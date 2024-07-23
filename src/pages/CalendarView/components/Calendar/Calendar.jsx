import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import HeaderRow from "./HeaderRow";
import TimeCol from "./TimeCol";
import MeetingCard from "./MeetingCard";
import MeetingFormModal from "./MeetingBookingModal/MeetingFormModal";
import Button from "../Button";
import DateTimePicker from "./MeetingBookingModal/Form/DateTimePicker";
import MenuIcon from "./menu_ic.svg";
import "./MeetingBookingModal/Form/style.css";

const Calendar = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3030/api/v1/meeting/get-meeting-list"
        );
        if (response.data.error) {
          toast.error(`Error: ${response.data.error + " " + response.data.message}`);
        } else {
          toast.success(`Success: ${response.data.message}`);
          setMeetings(response.data.data);
        }
      } catch (error) {
        toast.error(`Error: ${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchMeetings();
  }, []);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-between mx-4">
        <div className="w-[200px] my-4">
          <DateTimePicker
            name={"dateStart"}
            value={new Date()}
            action={() => {}}
          />
        </div>
        <div className="flex items-center justify-center rounded-full w-11 h-11 border-2">
          <img src={MenuIcon} width={17} height={17} />
        </div>
      </div>
      <div className="bg-[#EAEAEA] h-full pt-5">
        {loading && (
          <div className="flex justify-center items-center h-screen">
            <ClipLoader size={150} color={"blue"} loading={loading} />
          </div>
        )}
        <div className="flex items-center justify-between mx-4 mb-4">
          <span className="font-sans font-medium text-xl">
            Lịch đặt phòng họp
          </span>
          <Button label={"Đặt phòng họp"} type={"submit"} action={openModal} />
        </div>
        <div className="flex flex-col mx-4 rounded-xl overflow-hidden shadow-md">
          <HeaderRow />
          <div className="overflow-auto flex border-[#EAEAEA]">
            <TimeCol />
            <MeetingCard meetings={meetings} />
          </div>
        </div>
      </div>
      {modalIsOpen && <MeetingFormModal setLoading={setLoading} setMeetings={setMeetings} handleCloseModal={closeModal} />}
    </div>
  );
};

export default Calendar;
