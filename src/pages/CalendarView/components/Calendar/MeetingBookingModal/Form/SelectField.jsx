import React from "react";

const SelectField = ({ label, name, value, action, options, disabled }) => {
  return (
    <div className="font-regular font-sans text-sm">
      <span className="block mb-1 text-[#343434]">
        {label}
      </span>
      <div className="border-[1px] flex items-center rounded-[10px] px-3 py-2">
        <select value={value} name={name} onChange={action} className="w-full field-select" disabled={disabled} required>
          <option value="" hidden>Chọn</option>
          {options.filter(option => option.status === undefined || option.status === true).map(
            (option, index) =>
              <option key={index} value={option.value} className={`${option.textColor} || ''`}>
                {option.label}
              </option>
          )}
        </select>
      </div>
    </div>
  );
};

export default SelectField;
