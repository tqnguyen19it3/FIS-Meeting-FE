import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment-timezone";
import HeaderModal from "./HeaderModal";
import BottomControl from "./BottomControl";
import Form from "./Form/Form";

const MeetingFormModal = ({ setLoading, setMeetings, handleCloseModal }) => {
  const [meetingRooms, setMeetingRooms] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [addForm, setAddForm] = useState({
    meetingName: "",
    department: "",
    description: "",
    dateStart: "",
    timeStart: "",
    duration: "",
    participants: [],
    status: "",
    room: "",
  });

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
        .toISOString(), // Chuyển đổi thành UTC ISO string
      endTime: moment(addForm.dateStart)
        .hour((+addForm.timeStart + +addForm.duration).toString())
        .toISOString(), // Chuyển đổi thành UTC ISO string
      status: addForm.status,
      roomId: addForm.room,
      // participantIDs: addForm.participants,
      participantIDs: ["668f9671945ec809d8a89358", "668f9653945ec809d8a89354"],
    };

    try {
      // Gọi API để tạo meeting
      const response = await axios.post(
        "http://localhost:3030/api/v1/meeting/create-meeting-with-participants",
        transformMeetingData
      );

      if (response.data.error) {
        toast.error(
          `Error: ${response.data.error + " " + response.data.message}`
        );
      } else {
        toast.success(`Success: ${response.data.message}`);
        const meetingListData = await axios.get(
          "http://localhost:3030/api/v1/meeting/get-meeting-list"
        );

        setMeetings(meetingListData.data.data);
        // Reset form sau khi thành công
        setAddForm({
          meetingName: "",
          department: "",
          description: "",
          dateStart: "",
          timeStart: "",
          duration: "",
          participants: [],
          status: "",
          room: "",
        });
        // close form modal
        handleCloseModal();
      }
    } catch (error) {
      console.log("Error creating meeting: ", error);
      toast.error(
        "Error creating meeting: ",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChangeFormField = (e) => {
    const { name, value } = e.target;
    setAddForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchMeetingRooms = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3030/api/v1/meeting-room/get-meeting-room-list"
        );
        if (response.data.error) {
          toast.error(
            `Error: ${response.data.error + " " + response.data.message}`
          );
        } else {
          // toast.success(`Success: ${response.data.message}`);
          setMeetingRooms(response.data.data);
        }
      } catch (error) {
        toast.error(`Error: ${error}`);
      }
    };
    const fetchParticipants = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3030/api/v1/user/get-user-list"
        );
        if (response.data.error) {
          toast.error(
            `Error: ${response.data.error + " " + response.data.message}`
          );
        } else {
          // toast.success(`Success: ${response.data.message}`);
          setParticipants(response.data.data);
        }
      } catch (error) {
        toast.error(`Error: ${error}`);
      }
    };
    fetchMeetingRooms();
    fetchParticipants();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-25 flex justify-center items-center">
      <div className="bg-white rounded-[10px] w-full max-w-[1000px] max-h-full">
        <HeaderModal />
        <Form
          addForm={addForm}
          meetingRooms={meetingRooms}
          participants={participants}
          handleChangeFormField={handleChangeFormField}
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
