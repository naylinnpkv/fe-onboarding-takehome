import dayjs from "dayjs";
import { FormData } from "./components/OnboardingSteps";
import { UserPayLoad } from "./types";

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
  }
};
