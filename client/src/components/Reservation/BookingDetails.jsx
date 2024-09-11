import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PARTY_SIZE, TIME } from "../../constants/reservation";

const BookingDetails = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="flex flex-row w-full items-center justify-around px-10 gap-10">
      <div className="flex flex-col w-4/12 gap-2">
        <p className="text-start font-medium">인원</p>
        <select className="h-8 text-sm border border-gray-300 rounded-md p-1">
          {PARTY_SIZE.map((party) => (
            <option key={party}>{party}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col w-4/12 gap-2">
        <p className="text-start font-medium">날짜</p>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          className="w-full h-8 text-sm border border-gray-300 rounded-md p-1"
        />
      </div>
      <div className="flex flex-col w-4/12 gap-2">
        <p className="text-start font-medium">시간</p>
        <select className="h-8 text-sm border border-gray-300 rounded-md p-1">
          {TIME.map((time) => (
            <option key={time}>{time}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BookingDetails;