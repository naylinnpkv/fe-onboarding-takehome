"use client";

import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormData } from "./OnboardingSteps";
interface BirthDatePickerProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  dateIsInvalid: boolean;
}

export default function BirthdatePicker({
  register,
  errors,
  dateIsInvalid,
}: BirthDatePickerProps) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="flex flex-col space-y-4">
        <label className="text-gray-700 text-sm">Select Your Birthdate</label>
        <div className="flex flex space-x-4">
          {/* Day Selector */}

          <select
            {...register("day", { required: "Day is required" })}
            className={`border border-gray-300 rounded-lg p-2 bg-white shadow-sm focus:outline-none focus:ring-2 ${
              errors.day
                ? "focus:ring-red-500 focus:border-red-500"
                : "focus:ring-blue-500 focus:border-blue-500"
            }`}
          >
            <option value="">Day</option>
            {Array.from({ length: 31 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          {errors.day && (
            <span className="text-red-500 text-xs">{errors.day.message}</span>
          )}

          {/* Month Selector */}

          <select
            {...register("month", { required: "Month is required" })}
            className={`border border-gray-300 rounded-lg p-2 bg-white shadow-sm focus:outline-none focus:ring-2 ${
              errors.month
                ? "focus:ring-red-500 focus:border-red-500"
                : "focus:ring-blue-500 focus:border-blue-500"
            }`}
          >
            <option value="">Month</option>
            {months.map((month, index) => (
              <option key={index + 1} value={index + 1}>
                {month}
              </option>
            ))}
          </select>

          {errors.month && (
            <span className="text-red-500 text-sm">{errors.month.message}</span>
          )}

          {/* Year Selector */}

          <select
            {...register("year", { required: "Year is required" })}
            className={`border border-gray-300 rounded-lg p-2 bg-white shadow-sm focus:outline-none focus:ring-2 ${
              errors.year
                ? "focus:ring-red-500 focus:border-red-500"
                : "focus:ring-blue-500 focus:border-blue-500"
            }`}
          >
            <option value="">Year</option>
            {Array.from({ length: 120 }, (_, i) => currentYear - i).map(
              (year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              )
            )}
          </select>
          {errors.year && (
            <span className="text-red-500 text-sm">{errors.year.message}</span>
          )}
        </div>
      </div>
      {dateIsInvalid && (
        <div className="flex justify-center">
          <p className="text-red-500 text-sm mt-1">Dates are invalid</p>
        </div>
      )}
    </>
  );
}
