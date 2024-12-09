"use client";

import { ComponentSteps, User } from "@/types";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import AboutMe from "./AboutMe";
import Steps from "./Steps";
import BirthdatePicker from "./BirthDatePicker";
import dayjs from "dayjs";
import axios from "axios";
import { determineCurStep, formToApi } from "@/utils";
import Address from "./Address";
import { useRouter } from "next/navigation";
interface OnboardingProps {
  components: ComponentSteps[];
  preview?: boolean;
  previewStep?: number;
}

export class FormData {
  aboutMe?: string;
  day?: string;
  month?: string;
  year?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: number;

  constructor(user?: User) {
    if (user) {
      this.aboutMe = user.aboutMe || "";
      const birthdate = user.birthdate ? dayjs(user.birthdate) : null;
      this.day = birthdate ? birthdate.format("DD") : "";
      this.month = birthdate ? birthdate.format("MM") : "";
      this.year = birthdate ? birthdate.format("YYYY") : "";
      this.street = user.address?.street || "";
      this.city = user.address?.city || "";
      this.state = user.address?.state || "";
      this.zip = user.address?.zip || undefined;
    }
  }
}

export default function OnboardingSteps({
  components,
  preview = false,
  previewStep,
}: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState<number>(2);
  const [dateIsInvalid, setDateIsInvalid] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const currentComponents = components.filter((c) => c.step === currentStep);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const maxStep = 3;
  const router = useRouter();

  const fetchCurrentUser = async (token: string) => {
    try {
      const res = await axios<User>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/user`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      reset(new FormData(res.data)); //although prefilled form will not appear as we submit forms as a whole step
      const userCurStep = determineCurStep(res.data, components);

      if (userCurStep) {
        setCurrentStep(userCurStep);
      } else {
        router.push("/data");
      }
    } catch (e) {
      window.alert(e);
    }
  };

  useEffect(() => {
    if (preview && previewStep) {
      setCurrentStep(previewStep);
      return;
    }

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      router.push("/");
      return;
    }
    fetchCurrentUser(token);
    setIsMounted(true);
  }, [previewStep]);

  const onSubmit = async (data: FormData) => {
    if (preview) return;

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

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/update-create-data`,
        { data: formToApi(data) },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      reset();

      if (res.data) {
        if (currentStep < maxStep) setCurrentStep((prev) => prev + 1);
        else {
          router.push("/data");
        }
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log("Error response:", error.response?.data.message);
      } else {
        console.log("Error:", (error as Error).message);
      }
    }
  };

  if (!isMounted && !preview) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }
  if (preview && currentComponents.length === 0) {
    return (
      <div className="text-sm text-orange-700 ">
        Each step must have at least one component
      </div>
    );
  }

  return (
    <div
      className={`${
        preview ? "" : "min-h-screen"
      } flex flex-col items-center bg-gray-50 px-4 space-y-10`}
    >
      {!preview && <Steps step={currentStep} />}
      <div className="max-w-sm w-full flex-grow p-6 rounded-lg">
        <div className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="text-gray-700 font-semibold">
              Personal Information
            </label>
            {currentComponents.map((component) => {
              switch (component.name) {
                case "aboutMe":
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
