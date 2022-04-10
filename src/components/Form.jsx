import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getHotels } from "../store/features/hotelSlice";

const Form = (props) => {
  const { hotels } = useSelector((state) => state.hotels);
  const navigate = useNavigate();
  const [hotelName, setHotelName] = useState("");
  const [rating , setRating] = useState(0);
  const [hotelAddress, setHotelAddress] = useState("");
  const [city, setCity] = useState("");
  const [hotelDescription, setHotelDescription] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [nameBool, setNameBool] = useState(false);
  const [addressBool, setAddressBool] = useState(false);
  const [cityBool, setCityBool] = useState(false);
  const [descriptionBool, setDescriptionBool] = useState(false);
  const [file, setFile] = useState("");

  const dispatch = useDispatch();
  const nameHotelHandler = (event) => {
    setNameBool(true);
    if (event.target.value.length > 0) {
      setNameBool(false);
      setHotelName(event.target.value);
    } else {
      setHotelName("");
      setNameBool(true);
    }
  };
  const addressHotelHandler = (event) => {
    setAddressBool(true);
    if (event.target.value.length > 0) {
      setAddressBool(false);
      setHotelAddress(event.target.value);
    } else {
      setHotelAddress("");
      setAddressBool(true);
    }
  };
  const cityHotelHandler = (event) => {
    setCityBool(true);
    if (event.target.value.length > 0) {
      setCityBool(false);
      setCity(event.target.value);
    } else {
      setCity("");
      setCityBool(true);
    }
  };
  const descriptionHotelHandler = (event) => {
    setDescriptionBool(true);
    if (event.target.value.length) {
      setDescriptionBool(false);
      setHotelDescription(event.target.value);
    } else {
      setHotelDescription("");
      setDescriptionBool(true);
    }
  };
  const fileHandler = (event) => {
    setFile(event.target.files[0]);
  };

  const formHandler = async (e, value) => {
    e.preventDefault();
    try {
      if (value) {
        const data = new FormData();
        data.append("file", file);

        const res = await axios.post("http://localhost:3009/upload", data);
        const updatedHotel = await axios.put(
          `http://localhost:3009/api/places/updatePlace/${props.id}`,
          {
            name: hotelName,
            location: hotelAddress,
            city: city,
            description: hotelDescription,
            image: res.data.file.filename,
          }
        );

        if (updatedHotel.data) {
          dispatch(getHotels());
        }

        setHotelName("");
        setHotelAddress("");
        setCity("");
        setHotelDescription("");
        navigate("/");
        props.show(false);
      } else {
        const data = new FormData();
        data.append("file", file);

        const res = await axios.post("http://localhost:3009/upload", data);

        console.log(res.data.file);
        await axios.post("http://localhost:3009/api/places/add", {
          name: hotelName,
          location: hotelAddress,
          city: city,
          description: hotelDescription,
          coordinate: {
            lat: parseFloat(lat),
            lng: parseFloat(lng),
          },
          rating:rating,
          image: res.data.file.filename,
        });
        setHotelName("");
        setHotelAddress("");
        setCity("");
        setHotelDescription("");
        navigate("/");
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (props.id) {
      const findHotelById = () => {
        const hotel = hotels.find((hotel) => hotel._id === props.id);
        setHotelName(hotel.name);
        setHotelAddress(hotel.location);
        setCity(hotel.city);
        setHotelDescription(hotel.description);
        setFile(hotel.image);
      };
      findHotelById();
    }
  }, [props.id, hotels]);
  return (
    <div className=" bg-green-300 w-2/3 m-4">
      <h1 className="text-center text-lg">Add Hotel</h1>
      <form
        action=""
        className="flex flex-col gap-y-3 p-2 "
        onSubmit={(e) => formHandler(e, props.id)}
      >
        <input
          type="text"
          placeholder="name"
          value={hotelName || ""}
          onFocus={nameHotelHandler}
          onChange={nameHotelHandler}
          className={`py-2 px-1  border-b-2 border-b-gray-600 rounded-md focus:outline-0 ${
            nameBool ? "border-2 border-red-500 border-b-red-500 " : "border-0"
          }`}
        />

        <input
          type="text"
          placeholder="city"
          value={city || ""}
          onFocus={cityHotelHandler}
          onChange={cityHotelHandler}
          className={`py-2 px-1 border-0 border-b-2 border-b-gray-600 rounded-md focus:outline-0 ${
            cityBool ? "border-2 border-red-500 border-b-red-500 " : "border-0"
          }`}
        />

        <input
          type="text"
          placeholder="loaction"
          value={hotelAddress || ""}
          onFocus={addressHotelHandler}
          onChange={addressHotelHandler}
          className={`py-2 px-1 border-0 border-b-2 border-b-gray-600 rounded-md focus:outline-0 ${
            addressBool
              ? "border-2 border-red-500 border-b-red-500 "
              : "border-0"
          }`}
        />

        <div className=" flex gap-x-2 w-full">
          <input
            type="text"
            placeholder="lat"
            onChange={(e) => setLat(e.target.value)}
            className={`py-2 px-1 flex-1  border-0 border-b-2 border-b-gray-600 rounded-md focus:outline-0 `}
          />

          <input
            type="text"
            placeholder="lng"
            onChange={(e) => setLng(e.target.value)}
            className={`py-2 px-1 flex-1 border-0 border-b-2 border-b-gray-600 rounded-md focus:outline-0 `}
          />
        </div>
        <input type="number" placeholder="Rating"  onChange={(e) => setRating(e.target.value)}   className={`py-2 px-1 flex-1  border-0 border-b-2 border-b-gray-600 rounded-md focus:outline-0 `}/>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          value={hotelDescription}
          placeholder="decription"
          onFocus={descriptionHotelHandler}
          onChange={descriptionHotelHandler}
          className={`py-2 px-1 h-32 border-0 border-b-2 border-b-gray-600 rounded-md resize-none focus:outline-0 ${
            descriptionBool
              ? "border-2 border-red-500 border-b-red-500 "
              : "border-0"
          }`}
        ></textarea>
        <input type="file" onChange={fileHandler} />
        <button
          className=" bg-white w-36 self-center px-4 py-2 rounded-md"
          type="submit"
        >
          {props.UpdateHotel ? props.UpdateHotel : "Add Hotel"}
        </button>
      </form>
    </div>
  );
};

export default Form;
