import React from "react";

const TextInput = ({label, type, name, value, action}) => {
  return (
    <div className="font-regular font-sans text-sm">
      <span className="block mb-1 text-[#343434]">
        {label}
      </span>
      <div className="border-[1px] flex items-center rounded-[10px] px-3 py-2">
        <input
          type={type}
          className="text-sm w-full"
          name={name}
          placeholder="Nhập"
          value={value}
          onChange={action}
          required
        />
      </div>
    </div>
  );
};

export default TextInput;
