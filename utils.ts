import dayjs from "dayjs";
import { FormData } from "./components/OnboardingSteps";
import { ComponentSteps, User, UserPayLoad } from "./types";

export const formToApi = (data: FormData) => {
  const payload: UserPayLoad = {};

  if (data.aboutMe || (data.day && data.month && data.year)) {
    payload.userBasicData = {};
    if (data.aboutMe) {
      payload.userBasicData.aboutMe = data.aboutMe;
    }

    if (data.day && data.month && data.year) {
      const { day, month, year } = data;
      const birthdate = dayjs(
        `${year}-${month}-${day}`,
        "YYYY-MM-DD"
      ).toISOString();
      payload.userBasicData.birthdate = birthdate;
    }
  }
  if (data.street && data.city && data.state && data.zip) {
    const { street, city, state, zip } = data;
    payload.userAddress = {
      street,
      city,
      state,
      //@ts-ignore
      zip: parseFloat(zip),
    };
  }
  return payload;
};

export const determineCurStep = (
  user: User,
  componentSteps: ComponentSteps[]
): number | null => {
  const stepFields = {
    aboutMe: "aboutMe",
    address: "address",
    birthdate: "birthdate",
  };

  const sortedComponentSteps = componentSteps.sort(
    (a: ComponentSteps, b: ComponentSteps) => a.step - b.step
  );

  for (let step of sortedComponentSteps) {
    const field = stepFields[step.name as keyof typeof stepFields];
    if (field && !user[field as keyof typeof user]) {
      return step.step;
    }
  }
  return null;
};
