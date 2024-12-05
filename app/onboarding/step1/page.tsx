"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Steps from "@/components/Steps";
import SignUp from "@/components/SignUp";
import BirthdatePicker from "@/components/BirthDatePicker";

export default function Step1() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleNext = () => {
    // Save email and password to local storage or send it to the backend
    localStorage.setItem("userData", JSON.stringify({ email, password }));
    router.push("/step2");
  };

  const handlePrevious = () => {
    // Navigate to the previous step
    router.push("/step0");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 px-4">
      <Steps currentStep={2} />

      <div className="flex flex-col flex-grow items-center justify-center  w-full">
        <div className="max-w-sm w-full p-6 rounded-lg shadow-md border">
          <form>
            <BirthdatePicker />
            <textarea className="w-full mt-2" />
          </form>
        </div>

        <div className="flex justify-between w-full max-w-sm mt-6">
          <button
            onClick={handlePrevious}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg w-[45%]"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-[45%]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
