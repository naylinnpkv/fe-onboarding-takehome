import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormData } from "./OnboardingSteps";

interface AboutMeProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export default function AboutMe({ register, errors }: AboutMeProps) {
  return (
    <>
      <label className="text-gray-700 text-sm">About Me</label>
      <textarea
        className={`w-full border p-2 rounded-md focus:ring focus:ring-blue-300 ${
          errors.aboutMe ? "border-red-500" : "border-gray-300"
        }`}
        rows={10}
        placeholder="About me"
        {...register("aboutMe", { required: "About me is required" })}
      />
      {errors.aboutMe && (
        <p className="text-red-500 text-sm mt-1">{errors.aboutMe.message}</p>
      )}
    </>
  );
}
