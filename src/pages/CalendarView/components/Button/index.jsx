import React from 'react'

const Button = ({label, type, action}) => {

const buttonColor = type === 'cancel' ? "bg-[#D8D8D8]" : "bg-[#F7C245]";
  return (
    <button onClick={action} className={`px-4 py-2  ${buttonColor} text-black font-sans font-medium rounded-[10px] text-sm`}>
      {label}
    </button>
  )
}

export default Button