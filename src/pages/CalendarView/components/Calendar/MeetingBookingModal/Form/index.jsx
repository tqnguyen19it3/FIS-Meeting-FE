import React, { useEffect, useState } from "react";
import TextInput from "./TextInput";
import SelectField from "./SelectField";
import DateTimePicker from "./DateTimePicker";
import "../../../Calendar/style.css";
import Dropdown from "./Dropdown";
import moment from "moment-timezone";
import { isWeekend } from "../../../../../../utils";

const Form = ({
  participants,
  addForm,
  setAddForm,
  handleChangeFormField,
  availableMeetingTimes
}) => {

  const [timeStartOptions, setTimeStartOptions] = useState([]);
  const [durationOptions, setDurationOptions] = useState([]);

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

      // Nếu ngày được chọn là ngày hiện tại
      if (moment(addForm.dateStart).isSame(moment(), 'day')) {
        // Bắt đầu từ thời điểm hiện tại trở đi tính theo giờ
        currentTime = moment().add(1, 'hour').startOf('hour');
        if (currentTime.isBefore(dayStart)) {
          currentTime = dayStart;
        }
      }

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
            <Dropdown
        type="multi"
        title="Người tham dự"
        placeholder="Chọn"
        dataSelected={addForm.participants}
        onSelect={(item) => {
          const newDataSelected = addForm.participants.some(
            (find) => find.value === item.value
          )
            ? addForm.participants.filter((fil) => fil.value !== item.value)
            : [...addForm.participants, item];
          setAddForm({...addForm, participants: newDataSelected})
        }}
        data = {DUMMY_PARTICIPANT_DATA}
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
        disabled={!addForm.dateStart || isWeekend(addForm.dateStart) || !availableMeetingTimes.length || !timeStartOptions.length}
      />
      <SelectField
        label="Thời lượng họp"
        name={"duration"}
        value={addForm.duration}
        action={handleChangeFormField}
        options={durationOptions}
        disabled={ isWeekend(addForm.dateStart) || !timeStartOptions.length || !addForm.timeStart}
      />
    </div>
  );
};

export default Form;
