import React, { useEffect, useState } from "react";
import axiosInstance from '../../../../axiosConfig';
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import HeaderRow from "./HeaderRow";
import TimeCol from "./TimeCol";
import MeetingCard from "./MeetingCard";
import MeetingFormModal from "./MeetingBookingModal";
import Button from "../Button";
import DateTimePicker from "./MeetingBookingModal/Form/DateTimePicker";
import MenuIcon from "./menu_ic.svg";
import "../Calendar/style.css";
import { getStartAndEndOfWeek } from "../../../../utils";

const Calendar = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dateSelect, setDateSelect] = useState(new Date());

  useEffect(() => {
    const fetchMeetings = async () => {
      const { startDate, endDate } = getStartAndEndOfWeek(dateSelect);
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `/api/v1/meeting/get-meeting-list-by-week`,
          {
            params: { startDate, endDate },
          }
        );
        if (response.data.error) {
          toast.error(`${response.data.message}`);
        } else {
          // toast.success(`${response.data.message}`);
          setMeetings(response.data.data);
        }
      } catch (error) {
        toast.error(`${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchMeetings();
  }, [dateSelect]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-between mx-4">
        <div className="w-[200px] my-4">
          <DateTimePicker
            name={"dateSelect"}
            value={dateSelect}
            isValidated={false}
            action={(e) => setDateSelect(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center rounded-full w-11 h-11 border-2">
          <img src={MenuIcon} width={17} height={17} alt="Menu Icon"/>
        </div>
      </div>
      <div className="bg-[#EAEAEA] h-full pt-5">
        {loading && (
          <div className="flex fixed top-0 left-0 w-screen justify-center items-center h-screen">
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
      {modalIsOpen && (
        <MeetingFormModal
          dateSelect={dateSelect}
          setMeetings={setMeetings}
          handleCloseModal={closeModal}
          setDateSelect={setDateSelect}
        />
      )}
    </div>
  );
};

export default Calendar;
