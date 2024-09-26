import React from "react";
import { TableCard } from "../SafeTable/tableCard";
import SaveTable from "./SaveTable";

export const AboutMe = ({ formData, handleChange }) => {
  const handleSave = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">About Me</h2>
      <form onSubmit={handleSave}>
        <div className="mb-4">
          <label htmlFor="firstName" className="block mb-1">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="border p-2 rounded w-4/5"
            placeholder="Enter your first name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="border p-2 rounded w-4/5"
            placeholder="Enter your last name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="emailAddress" className="block mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="emailAddress"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            className="border p-2 rounded w-4/5"
            placeholder="Enter your email address"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border p-2 rounded w-4/5"
            placeholder="Enter your location"
          />
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="w-1/5 h-10 bg-amber-200 m-auto px-2 py-1"
          >
            저장
          </button>
        </div>
      </form>
      {/* 구분선 */}
      <div className="border-b border-gray-300 my-10 " />
      <h2 className="text-xl font-semibold mb-4">찜한 식당</h2>
      <SaveTable />
    </div>
  );
};