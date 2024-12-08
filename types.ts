export interface Address {
  street: string;
  city: string;
  state: string;
  zip: number;
}

export interface UserBasicData {
  aboutMe?: string;
  birthdate?: string;
}

export interface User extends UserBasicData {
  address: Address;
}

export interface UserPayLoad {
  userBasicData?: UserBasicData;
  userAddress?: Address;
}

export interface OnboardingState {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  aboutMe: string;
  setAboutMe: (aboutMe: string) => void;
  address: Address;
  setAddress: (address: Partial<Address>) => void;
  birthdate: string;
  setBirthdate: (birthdate: string) => void;
}

export interface ComponentSteps {
  id: string;
  name: string;
  step: number;
}
