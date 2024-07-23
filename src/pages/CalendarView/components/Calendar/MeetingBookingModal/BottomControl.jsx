import React from "react";
import Button from "../../Button";


const BottomControl = ({handleCloseModal, handleFormSubmit}) => {
  
  return (
    <div className="p-5 flex gap-2 items-center justify-end">
      <Button label={'Hủy bỏ'} type={'cancel'} action={handleCloseModal} />
      <Button label={'Đặt phòng'} type={'submit'} action={handleFormSubmit} />
    </div>
  );
};

export default BottomControl;
