import React from "react";
import TextInput from "./TextInput";
import TextareaInput from "./TextareaInput";
import SelectField from "./SelectField";
import DateTimePicker from "./DateTimePicker";
import "./style.css";
import MultiSelectDropdown from "./MultiSelectDropdown";

const Form = ({
  meetingRooms,
  participants,
  addForm,
  handleChangeFormField,
}) => {
  const durationOptions = [
    { value: "1", label: "1 tiếng" },
    { value: "2", label: "2 tiếng" },
    { value: "3", label: "3 tiếng" },
    { value: "4", label: "4 tiếng" },
    { value: "5", label: "5 tiếng" },
    { value: "6", label: "6 tiếng" },
    { value: "7", label: "7 tiếng" },
    { value: "8", label: "8 tiếng" },
  ];

  const timeStartOptions = [
    { value: "9", label: "9:00" },
    { value: "10", label: "10:00" },
    { value: "11", label: "11:00" },
    { value: "12", label: "12:00" },
    { value: "13", label: "13:00" },
    { value: "14", label: "14:00" },
    { value: "15", label: "15:00" },
    { value: "16", label: "16:00" },
    { value: "17", label: "17:00" },
    { value: "18", label: "18:00" },
  ];

  const statusOptions = [
    {
      value: "scheduled",
      label: "Scheduled",
      textColor: "text-meeting-scheduled",
    },
    { value: "ongoing", label: "Ongoing", textColor: "text-meeting-ongoing" },
    {
      value: "completed",
      label: "Completed",
      textColor: "text-meeting-completed",
    },
    {
      value: "cancelled",
      label: "Cancelled",
      textColor: "text-meeting-cancelled",
    },
  ];

  const transformedMeetingRoomData = meetingRooms?.map((item, index) => {
    return {
      value: item._id,
      label: item.roomName,
      status: item.status,
    };
  });

  const transformedParticipantData = participants?.map((user, index) => {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  });

  return (
    <div className="grid grid-cols-3 gap-[20px] p-5 text-start">
      <TextInput
        label={"Tên cuộc họp"}
        type={"text"}
        name={"meetingName"}
        value={addForm.meetingName}
        action={handleChangeFormField}
      />
      <TextInput
        label={"Phòng ban"}
        type={"text"}
        name={"department"}
        value={addForm.department}
        action={handleChangeFormField}
      />
      <SelectField
        label="Phòng họp"
        name={"room"}
        value={addForm.room}
        action={handleChangeFormField}
        options={transformedMeetingRoomData}
      />
      <DateTimePicker  
        label="Ngày họp"
        name={"dateStart"}
        value={addForm.dateStart}
        action={handleChangeFormField} />
      <SelectField
        label="Thời gian bắt đầu"
        name={"timeStart"}
        value={addForm.timeStart}
        action={handleChangeFormField}
        options={timeStartOptions}
      />
      <SelectField
        label="Thời lượng họp"
        name={"duration"}
        value={addForm.duration}
        action={handleChangeFormField}
        options={durationOptions}
      />
      <MultiSelectDropdown
        label="Danh sách tham gia"
        name={"participants"}
        value={addForm.participants}
        action={handleChangeFormField}
        options={transformedParticipantData}
      />
      {/* <SelectField
        label="Người tham dự"
        name={"participants"}
        value={participants}
        // onChange={(e) => setParticipants(e.target.value)}
        options={transformedParticipantData}
      /> */}

      <SelectField
        label="Trạng thái cuộc họp"
        name={"status"}
        value={addForm.status}
        action={handleChangeFormField}
        options={statusOptions}
      />
      <TextareaInput
        label={"Mô tả cuộc họp"}
        name={"description"}
        value={addForm.description}
        action={handleChangeFormField}
      />
    </div>
  );
};

export default Form;
