import UserTable from "@/components/UserTable";
import { User } from "@/types";

export default async function Page() {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/users`;
  const data = await fetch(url, { cache: "no-store" });
  const users: User[] = await data.json();
  return <UserTable users={users} />;
}
