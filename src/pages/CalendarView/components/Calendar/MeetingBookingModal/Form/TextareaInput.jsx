import React from "react";

const TextareaInput = ({label, name, value, action}) => {
  return (
    <div>
      <span className="font-regular font-sans text-sm block text-[#343434]">
        {label}
      </span>
      <div className="border-[1px] flex items-center rounded-[10px] px-3 py-2">
        <textarea 
          className="text-sm w-full"
          name={name}
          rows={1}
          value={value}
          placeholder="Nhập"
          onChange={action}
          required
        />
      </div>
    </div>
  );
};

export default TextareaInput;
