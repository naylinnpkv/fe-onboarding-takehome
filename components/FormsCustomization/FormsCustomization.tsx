"use client";

import { useState } from "react";
import { ComponentStepLabels, ComponentSteps } from "@/types";
import SignUp from "../SignUp";
import OnboardingSteps from "../OnboardingSteps";
import axios from "axios";

interface FormsCustomizationProps {
  components: ComponentSteps[];
}
export default function FormsCustomization({
  components,
}: FormsCustomizationProps) {
  const [curComponents, setCurComponents] =
    useState<ComponentSteps[]>(components);

  const customizableSteps = [2, 3];

  const onChangeHandler = (val: number, id: string) => {
    setCurComponents((prev) =>
      prev.map((component) => {
        if (component.id === id) {
          component.step = val;
        }
        return component;
      })
    );
  };

  const isValid = customizableSteps.every((step) =>
    curComponents.some((component) => component.step === step)
  );

  const handleSubmit = async () => {
    if (!isValid) {
      window.alert("steps must be tied to at least one component!");
      return;
    }
    try {
      const data = curComponents.map((c) => ({ id: c.id, step: c.step }));

      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/components/update`,
        {
          data,
        }
      );

      if (res.data) window.alert("Components order updated");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="h-screen p-10 flex flex-col">
      <div className="flex justify-between flex-grow">
        {/* Left Section */}
        <div className="flex flex-col justify-start mt-10 min-h-full basis-[30%] font-semibold border-r-2 pr-5">
          <div>
            {curComponents.map((c) => (
              <div
                key={c.name}
                className="flex flex-col shadow-md border-rounded p-4 bg-gray-50 gap-1 justify-center items-start mb-4"
              >
                <div>
                  {
                    ComponentStepLabels[
                      c.name as keyof typeof ComponentStepLabels
                    ]
                  }
                </div>
                {c.step === 1 ? (
                  <div className="flex mt-2 items-center gap-2">
                    <input type="radio" readOnly checked disabled />
                    <label className="text-sm">Step {c.step}</label>
                  </div>
                ) : (
                  customizableSteps.map((step) => (
                    <div key={step} className="flex mt-2 items-center gap-2">
                      <input
                        type="radio"
                        value={step}
                        checked={c.step === step}
                        onChange={(e) => {
                          onChangeHandler(
                            parseFloat(e.currentTarget.value),
                            c.id
                          );
                        }}
                      />
                      <label className="text-sm">Step {step}</label>
                    </div>
                  ))
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-500 text-white rounded shadow hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col justify-start flex-grow items-center">
          {/* Step 1 */}
          <div className="text-xl font-bold ">Preview</div>
          <div className="flex flex-col items-center gap-5">
            <div className="self-start font-semibold italic text-md">
              Step - 1
            </div>
            <SignUp preview />
          </div>
          {/* Customizable Steps */}
          {customizableSteps.map((step) => (
            <div key={step} className="flex flex-col items-center gap-5 mt-10">
              <div className="self-start italic font-semibold text-md">
                Step - {step}
              </div>
              <OnboardingSteps
                components={curComponents}
                preview
                previewStep={step}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
