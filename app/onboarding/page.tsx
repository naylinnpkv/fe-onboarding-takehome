import { ComponentSteps } from "@/types";
import OnboardingSteps from "@/components/OnboardingSteps";

export default async function Page() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/components`);
  const components: ComponentSteps[] = await data.json();

  return <OnboardingSteps components={components} />;
}
