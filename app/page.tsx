import SignUp from "@/components/SignUp";
import Steps from "@/components/Steps";

export default async function Page() {
  return (
    <div>
      <Steps step={1} />
      <SignUp />
    </div>
  );
}
