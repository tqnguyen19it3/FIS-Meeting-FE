import React, { useEffect, useState } from "react";
import axiosInstance from '../../../../../axiosConfig';
import { toast } from "react-toastify";
import moment from "moment-timezone";
import HeaderModal from "./HeaderModal";
import BottomControl from "./BottomControl";
import Form from "./Form";
import { ClipLoader } from "react-spinners";
import { getStartAndEndOfWeek } from "../../../../../utils";

const MeetingFormModal = ({
  setMeetings,
  handleCloseModal,
  setDateSelect,
  dateSelect,
}) => {
  const [meetingRooms, setMeetingRooms] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [availableMeetingTimes, setAvailableMeetingTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addForm, setAddForm] = useState({
    meetingName: "",
    department: "R&D",
    description: "",
    dateStart: "",
    timeStart: "",
    duration: "",
    participants: [],
    status: "scheduled",
    room: "",
  });


  useEffect(() => {
    const fetchMeetingRooms = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/v1/meeting-room/get-meeting-room-list"
        );
        if (response.data.error) {
          toast.error(`abasas${response.data.message}`);
        } else {
          setMeetingRooms(response.data.data);
        }
      } catch (error) {
        toast.error("Hệ thống đã xảy ra lỗi, vui lòng thử lại sau");
      }
    };
    const fetchParticipants = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/v1/user/get-user-list"
        );
        if (response.data.error) {
          toast.error(`${response.data.message}`);
        } else {
          setParticipants(response.data.data);
        }
      } catch (error) {
        toast.error("Hệ thống đã xảy ra lỗi, vui lòng thử lại sau");
      }
    };

    const fetchAvailableMeetingTimes = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/v1/meeting/get-available-meeting-times-during-day",
          {
            params: {
              date: moment(dateSelect).isSameOrAfter(moment(new Date())) ? dateSelect : new Date(),
            }
          }
        );        
        setAddForm((prevForm) => ({
          ...prevForm,
          dateStart:
            moment(dateSelect).toDate() >= moment(new Date()).toDate()
              ? dateSelect
              : new Date(),
        }));
        setAvailableMeetingTimes(response.data.data);
      } catch (error) {
        toast.error("Hệ thống đã xảy ra lỗi, vui lòng thử lại sau");
      }
    };
    fetchMeetingRooms();
    fetchParticipants();
    fetchAvailableMeetingTimes();
  }, [dateSelect]);

  const handleChangeFormField = async (e) => {
    const { name, value } = e.target;
    if (name === "dateStart") {
      try {
        const response = await axiosInstance.get(
          "/api/v1/meeting/get-available-meeting-times-during-day",
          {
            params: { date: value },
          }
        );
        setAvailableMeetingTimes(response.data.data);
      } catch (error) {
        toast.error("Hệ thống đã xảy ra lỗi, vui lòng thử lại sau");
      }
    }
    setAddForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Tạo đối tượng kết quả với các trường cần thiết
    const transformMeetingData = {
      meetingName: addForm.meetingName,
      description: addForm.description,
      department: addForm.department,
      startTime: moment(addForm.dateStart)
        .hour(addForm.timeStart)
        .minute(0)
        .second(0)
        .millisecond(0)
        .toISOString(), // Chuyển đổi thành UTC ISO string
      endTime: moment(addForm.dateStart)
        .hour((+addForm.timeStart + +addForm.duration).toString())
        .minute(0)
        .second(0)
        .millisecond(0)
        .toISOString(), // Chuyển đổi thành UTC ISO string
      status: addForm.status,
      roomId: addForm.room,
      participantIDs: addForm.participants.map((item) => item.value),
    };
    try {
      // Gọi API để tạo meeting
      const response = await axiosInstance.post(
        "/api/v1/meeting/create-meeting-with-participants",
        transformMeetingData
      );      

      if (response.data.error) {
        toast.error(`${response.data.message}`);
      } else {
        toast.success(`${response.data.message}`);
        const meetingListData = await axiosInstance.get(
          "/api/v1/meeting/get-meeting-list-by-week",
          {
            params: getStartAndEndOfWeek(response.data.data.startTime)
          }
        );        
        setDateSelect(response.data.data.startTime);
        setMeetings(meetingListData.data.data);
        // Reset form sau khi thành công
        setAddForm({
          meetingName: "",
          department: "R&D",
          description: "",
          dateStart: "",
          timeStart: "",
          duration: "",
          participants: [],
          status: "scheduled",
          room: "",
        });
        // close form modal
        handleCloseModal();
      }
    } catch (error) {
      toast.error("Lỗi tạo cuộc họp, vui lòng thử lại sau");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-25 flex justify-center items-center">
      {loading && (
        <div className="flex fixed top-0 left-0 justify-center items-center h-screen w-screen">
          <ClipLoader size={150} color={"blue"} loading={loading} />
        </div>
      )}
      <div className="bg-white rounded-[10px] w-full max-w-[1000px] max-h-full">
        <HeaderModal />
        <Form
          addForm={addForm}
          setAddForm={setAddForm}
          meetingRooms={meetingRooms}
          participants={participants}
          handleChangeFormField={handleChangeFormField}
          availableMeetingTimes={availableMeetingTimes}
        />
        <BottomControl
          handleCloseModal={handleCloseModal}
          handleFormSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default MeetingFormModal;
