import axios from "axios";
import React, { useState } from "react";

const AddRoom = (props) => {
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [roomPrice, setRoomPrice] = useState("");

  const [roomImage, setRoomImage] = useState("");
  const [roomType, setRoomType] = useState("");

  const formHandler = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("file", roomImage);
    const res = await axios.post("http://localhost:3009/upload", data);
    await axios.post(`http://localhost:3009/api/places/add/${props.hotelId}`, {
      roomName,
      roomDescription,
      roomPrice,
      roomType,
      roomImage: res.data.file.filename,
    });
    setRoomName("");
    setRoomDescription("");
    setRoomPrice("");
    setRoomImage("");
    setRoomType("");
    props.setShowRoom(false);
  };

  return (
    <>
      {props.showRoom && (
        <div className="z-10  w-screen h-screen fixed top-0 left-0 ">
          <div className=" fixed z-50 w-full h-full flex justify-center items-center">
            <div className=" bg-green-300 w-2/3 m-4">
              <h1 className="text-center text-lg">Add Room</h1>
              <form
                action=""
                onSubmit={formHandler}
                className="flex flex-col gap-y-3 p-2 "
              >
                <input
                  type="text"
                  placeholder="name of Room"
                  onChange={(e) => setRoomName(e.target.value)}
                  className={`py-2 px-1  border-b-2 border-b-gray-600 rounded-md focus:outline-0`}
                />

                <input
                  type="number"
                  placeholder="price"
                  onChange={(e) => setRoomPrice(e.target.value)}
                  className={`py-2 px-1 border-0 border-b-2 border-b-gray-600 rounded-md focus:outline-0`}
                />

                <input
                  type="text"
                  placeholder="roomType"
                  onChange={(e) => setRoomType(e.target.value)}
                  className={`py-2 px-1 border-0 border-b-2 border-b-gray-600 rounded-md focus:outline-0
              `}
                />

                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  onChange={(e) => setRoomDescription(e.target.value)}
                  placeholder="decription"
                  className={`py-2 px-1 h-32 border-0 border-b-2 border-b-gray-600 rounded-md resize-none focus:outline-0
              
              `}
                ></textarea>
                <input
                  type="file"
                  onChange={(e) => setRoomImage(e.target.files[0])}
                />
                <button
                  className=" bg-white w-36 self-center px-4 py-2 rounded-md"
                  type="submit"
                >
                  add Room
                </button>
              </form>
            </div>
          </div>
          <div className="bg-green-200  opacity-50 w-full h-full"></div>
        </div>
      )}
    </>
  );
};

export default AddRoom;
