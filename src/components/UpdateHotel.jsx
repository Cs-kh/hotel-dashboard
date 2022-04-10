import React from "react";
import Form from "./Form";

const UpdateHotel = (props) => {
  return (
    <>
      {props.show && (
        <div className="z-10  w-screen h-screen fixed top-0 left-0 ">
          <div className=" fixed z-50 w-full h-full flex justify-center items-center">
            <Form UpdateHotel='Updatehotel' id={props.hotelId} show={props.setShow} />
          </div>
          <div className="bg-green-200  opacity-50 w-full h-full"></div>
        </div>
      )}
    </>
  );
};

export default UpdateHotel;
