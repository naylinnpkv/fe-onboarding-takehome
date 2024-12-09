import FormsCustomization from "@/components/FormsCustomization/FormsCustomization";
import { ComponentSteps } from "@/types";
export default async function Page() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/components`);
  const components: ComponentSteps[] = await data.json();

  return <FormsCustomization components={components} />;
}
