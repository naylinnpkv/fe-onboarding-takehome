"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  password: string;
}

interface SignUpProps {
  preview?: boolean;
}

export default function SignUp({ preview = false }: SignUpProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/signin-or-signUp/`,
        data
      );
      const token = res.data.token;
      localStorage.setItem("jwtToken", token);
      reset();
      router.push("/onboarding");
    } catch (e) {
      window.alert(e);
    }
  };

  return (
    <div
      className={`${
        preview ? "" : "min-h-screen"
      } flex flex-col items-center bg-gray-50 px-4 space-y-10`}
    >
      <div className="max-w-sm w-full flex-grow p-6 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-4">
            <label className="text-gray-700 font-semibold">
              Sign-Up/Sign-In
            </label>
            <input
              type="email"
              className={`w-full border p-2 rounded-md focus:ring focus:ring-blue-300 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Email"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email format.",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
            <input
              type="password"
              className={`w-full border p-2 rounded-md focus:ring focus:ring-blue-300 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Password"
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters.",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex justify-center w-full max-w-sm mt-6">
            <input
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
              value="Submit"
              disabled={preview}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
