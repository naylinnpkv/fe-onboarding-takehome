import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormData } from "./OnboardingSteps";

interface AddressProps {
  errors: FieldErrors<FormData>;
  register: UseFormRegister<FormData>;
}

export default function Address({ register, errors }: AddressProps) {
  return (
    <div className="flex flex-col w-full space-y-4 my-2">
      <label className="text-gray-700 text-sm">Enter Your Home Address</label>
      <input
        {...register("street", { required: "street is required" })}
        placeholder="street address"
        className="w-full border p-2 rounded-md focus:ring focus:ring-blue-300"
      />
      {errors.street && (
        <p className="text-red-500 text-sm">{errors.street.message}</p>
      )}
      <div className="flex space-x-2 items-center w-full">
        <div className="flex flex-col">
          <input
            {...register("city", { required: "city is required" })}
            placeholder="city"
            className=" border p-2 rounded-md focus:ring focus:ring-blue-300"
          />
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <input
            {...register("state", { required: "state is required" })}
            type="text"
            placeholder="state"
            className=" border p-2 rounded-md focus:ring focus:ring-blue-300"
          />
          {errors.state && (
            <p className="text-red-500 text-sm">{errors.state.message}</p>
          )}
        </div>
      </div>
      <input
        {...register("zip", {
          required: "zip code is required",
          pattern: {
            value: /^[0-9]+$/,
            message: "zip code must be numeric",
          },
          minLength: {
            value: 5,
            message: "zip code must be at least 5 digits",
          },
          maxLength: {
            value: 5,
            message: "zip code cannot exceed 5 digits",
          },
        })}
        placeholder="zip code"
        className={`w-24 border p-2 rounded-md focus:ring ${
          errors.zip
            ? "border-red-500 focus:ring-red-300"
            : "focus:ring-blue-300"
        }`}
      />
      {errors.zip && (
        <p className="text-red-500 text-sm">{errors.zip.message}</p>
      )}
    </div>
  );
}
