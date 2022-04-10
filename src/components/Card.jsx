import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getHotels } from "../store/features/hotelSlice";
import UpdateHotel from "./UpdateHotel";
import AddRoom from "./AddRoom";
const Card = ({ children }) => {
  const { hotels, isLoading, error } = useSelector((state) => state.hotels);
  const [hotelId, setHotelId] = useState(null);
  const [bool, setBool] = useState(false);
  const [showRoom, setShowRoom] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHotels());
  }, [dispatch, hotels.length]);

  const deleteHotel = async (id) => {
    try {
      await axios.delete(`http://localhost:3009/api/places/${id}`);
      dispatch(getHotels());
    } catch (error) {
      console.log(error);
    }
  };

  const updateHotel = (id) => {
    setHotelId(id);
    setBool(true);
  };
  const addRoom = (id) => {
    setHotelId(id);
    setShowRoom(true);
  };
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Something Wrong</div>}
      {hotels && (
        <div className="flex flex-wrap gap-y-3 gap-x-4 justify-center  sm:justify-center sm:items-center lg:justify-start lg:gap-4  p-4">
          {hotels.map((hotel) => (
            <div
              className=" w-auto sm:max-w-[350px] lg:w-[350px] bg-slate-100 "
              key={hotel._id}
            >
              <div className="w-full">
                <img
                  className="object-cover w-full"
                  src={`http://localhost:3009/api/upload/${hotel.image}`}
                  alt=""
                />
              </div>
              <div className="px-2 py-3">
                <h3 className="text-lg font-semibold ">{hotel.name}</h3>
                <p className="">
                  <span className="pr-2">icon</span>

                  <span>{hotel.location}</span>
                </p>
                <span>{hotel.description}</span>
              </div>
              <div className="flex gap-x-6  px-2  mb-4">
                <button
                  onClick={() => addRoom(hotel._id)}
                  className="bg-green-500 px-3 py-2    rounded-md text-sm font-semibold text-white"
                >
                  Add Room
                </button>
                <button
                  onClick={() => updateHotel(hotel._id)}
                  className="bg-blue-500 px-3 py-2 rounded-md text-sm font-semibold text-white"
                >
                  Update Hotel
                </button>
                <button
                  onClick={() => deleteHotel(hotel._id)}
                  className="bg-red-500 px-3 py-2 rounded-md text-sm font-semibold text-white"
                >
                  Delete Hotel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <UpdateHotel show={bool} setShow={setBool} hotelId={hotelId} />
      <AddRoom
        showRoom={showRoom}
        setShowRoom={setShowRoom}
        hotelId={hotelId}
      />
    </>
  );
};

export default Card;
