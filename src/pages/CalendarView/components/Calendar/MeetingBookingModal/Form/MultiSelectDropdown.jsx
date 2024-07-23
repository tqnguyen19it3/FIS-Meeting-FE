import React from "react";
import Multiselect from "multiselect-react-dropdown";

const MultiSelectDropdown = ({ label, name, value, action, options }) => {
  return (
    <div>
        <span className="font-regular font-sans text-sm block mb-4 text-[#343434]">
            {label}
        </span>
        <div className="border-[1px] flex items-center rounded-[10px] px-3 py-2">
            <Multiselect
                className="w-full"
                style={{overflow: 'hidden'}}
                displayValue="email"
                onKeyPressFn={function noRefCheck(){}}
                onRemove={function noRefCheck(){}}
                onSearch={function noRefCheck(){}}
                onSelect={function noRefCheck(){}}
                options={options}
            />
        </div>
    </div>
  );
};

export default MultiSelectDropdown;
