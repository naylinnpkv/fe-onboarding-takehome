import { redirect } from "next/navigation";

export default function Home() {
  redirect("/onboarding/step1");
  return null;
}
