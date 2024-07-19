import React from 'react'

const DateTimePicker = ({onChange, title, placeholder}) => {
    const handleOnChange = (date) => {
        // kfjldfgj
        onChange(date)
    }
  return (
    <div>
        <span className="font-regular font-sans text-sm block mb-4 text-[#343434]">
            {title}
        </span>
        <DatePicker
            className="text-sm"
            selected={null}
            placeholderText={placeholder}
            onChange={(date) => handleOnChange(date)}
            customInput={
            <div className="px-12 py-8 flex items-center justify-between rounded-10 border">
                <span className="font-sans font-regular text-sm text-[#7E7E7E]">
                Chọn
                </span>
                <img src="{CalendarIcon}" width="{16}" height="{16}" />
            </div>
            }
        />
    </div>
  )
}

export default DateTimePicker