import React, { useEffect, useState } from "react";
import TextInput from "./TextInput";
import TextareaInput from "./TextareaInput";
import SelectField from "./SelectField";
import DateTimePicker from "./DateTimePicker";
import "./style.css";
import Dropdown from "./Dropdown";
import moment from "moment-timezone";
import { isWeekend } from "../../utils";

const Form = ({
  meetingRooms,
  participants,
  addForm,
  setAddForm,
  handleChangeFormField,
  availableMeetingTimes
}) => {

  const [timeStartOptions, setTimeStartOptions] = useState([]);
  const [durationOptions, setDurationOptions] = useState([]);

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

  const DUMMY_PARTICIPANT_DATA = transformedParticipantData.map(part => {
    return {
      label: part.email,
      value: part.id
    }
  })

  useEffect(() => {
    const generateTimeStartOptions = () => {
      const options = [];
      const dayStart = moment(addForm.dateStart).startOf('day').add(9, 'hours'); // 9:00
      const dayEnd = moment(addForm.dateStart).startOf('day').add(18, 'hours'); // 18:00

      let currentTime = dayStart;

      while (currentTime < dayEnd) {
        const isAvailable = availableMeetingTimes.some(slot => {
          const slotStart = moment(slot.start);
          const slotEnd = moment(slot.end);
          return currentTime.isBetween(slotStart, slotEnd, null, '[)');
        });

        if (isAvailable) {
          options.push({
            value: currentTime.format('HH'),
            label: currentTime.format('HH:mm')
          });
        }

        currentTime = currentTime.add(1, 'hour');
      }

      setTimeStartOptions(options);
    };

    generateTimeStartOptions();
  }, [addForm.dateStart, availableMeetingTimes]);

  useEffect(() => {
    const updateDurationOptions = () => {
      const selectedTimeStart = moment(addForm.dateStart).startOf('day').add(addForm.timeStart, 'hours'); // Thời gian bắt đầu đã chọn

      const availableDurationOptions = [];
      
      availableMeetingTimes.forEach(slot => {
        const slotStart = moment(slot.start);
        const slotEnd = moment(slot.end);

        if (selectedTimeStart.isSameOrAfter(slotStart) && selectedTimeStart.isBefore(slotEnd)) {
          const maxDuration = Math.min(slotEnd.diff(selectedTimeStart, 'hours'), 8);
          for (let i = 1; i <= maxDuration; i++) {
            availableDurationOptions.push({
              value: i.toString(),
              label: `${i} tiếng`
            });
          }
        }
      });


      setDurationOptions(availableDurationOptions);
    };

    if (addForm.timeStart) {
      updateDurationOptions();
    }
  }, [addForm.timeStart, addForm.dateStart, availableMeetingTimes]);

  return (
    <div className="grid grid-cols-3 items-end justify-end gap-[20px] p-5 text-start">
      <TextInput
        label={"Tên cuộc họp"}
        type={"text"}
        name={"meetingName"}
        value={addForm.meetingName}
        action={handleChangeFormField}
      />
      <TextInput
        label={"Mô tả cuộc họp"}
        type={"text"}
        name={"description"}
        value={addForm.description}
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
        action={handleChangeFormField}
        isValidated={true}
      />
      <SelectField
        label="Thời gian bắt đầu"
        name={"timeStart"}
        value={addForm.timeStart}
        action={handleChangeFormField}
        options={timeStartOptions}
        disabled={!addForm.dateStart || isWeekend(addForm.dateStart) || !availableMeetingTimes.length}
      />
      <SelectField
        label="Thời lượng họp"
        name={"duration"}
        value={addForm.duration}
        action={handleChangeFormField}
        options={durationOptions}
        disabled={!addForm.timeStart}
      />
      <Dropdown
        type="multi"
        title="Người tham dự"
        placeholder="Chọn"
        dataSelected={addForm.participants}
        onSelect={(item) => {
          const newDataSelected = addForm.participants.some(
            (find) => find.value == item.value
          )
            ? addForm.participants.filter((fil) => fil.value != item.value)
            : [...addForm.participants, item];
          setAddForm({...addForm, participants: newDataSelected})
        }}
        data = {DUMMY_PARTICIPANT_DATA}
      />
    </div>
  );
};

export default Form;
