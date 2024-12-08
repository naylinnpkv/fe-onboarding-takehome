"use client";

import { Address as AddressType, ComponentSteps, User } from "@/types";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import AboutMe from "./AboutMe";
import Steps from "./Steps";
import BirthdatePicker from "./BirthDatePicker";
import dayjs from "dayjs";
import axios from "axios";
import { formToApi } from "@/utils";
import Address from "./Address";
import { useRouter } from "next/navigation";
interface OnboardingProps {
  components: ComponentSteps[];
}

export interface FormData {
  aboutMe?: string;
  day?: string;
  month?: string;
  year?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: number;
  address?: AddressType;
}

export default function OnboardingSteps({ components }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState<number>(2);
  const [dateIsInvalid, setDateIsInvalid] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const currentComponents = components.filter((c) => c.step === currentStep);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const maxStep = components.length;
  const router = useRouter();

  const currentUser = async (token: string) => {
    try {
      const res = await axios<User>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/user`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setUser(res.data);
    } catch (e) {
      window.alert(e);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      router.push("/");
      return;
    }
    currentUser(token);
    setIsMounted(true);
  }, []);

  const onSubmit = async (data: FormData) => {
    const token = localStorage.getItem("jwtToken");

    if (data.day && data.month && data.year) {
      const date = dayjs(
        `${data.year}-${data.month}-${data.day}`,
        "YYYY-MM-DD"
      );
      if (!date.isValid()) {
        setDateIsInvalid(true);
        return;
      }
    }
    console.log("FORMTOAPI", formToApi(data));
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/update-create-data`,
        { data: formToApi(data) },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      reset();
      setCurrentStep((prev) => (prev === maxStep ? prev : prev + 1));
    } catch (error: any) {
      if (error.response) {
        console.log("Error response:", error.response.data.message);
      } else {
        console.log("Error:", error.message);
      }
    }
  };

  if (!isMounted) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 px-4 space-y-10">
      <Steps step={currentStep} />
      <div className="max-w-sm w-full flex-grow p-6 rounded-lg">
        <div className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="text-gray-700 font-semibold">
              Personal Information
            </label>
            {currentComponents.map((component) => {
              switch (component.name) {
                case "about_me":
                  return (
                    <AboutMe
                      key={component.id}
                      register={register}
                      errors={errors}
                    />
                  );
                case "address":
                  return (
                    <Address
                      key={component.id}
                      register={register}
                      errors={errors}
                    />
                  );
                case "birthdate":
                  return (
                    <BirthdatePicker
                      key={component.id}
                      register={register}
                      errors={errors}
                      dateIsInvalid={dateIsInvalid}
                    />
                  );
              }
            })}
            <div className="flex justify-center w-full max-w-sm mt-6">
              <input
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
                value="Submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
