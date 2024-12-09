import UserTable from "@/components/UserTable";
import { User } from "@/types";

export default async function Page() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`);
  const users: User[] = await data.json();
  return <UserTable users={users} />;
}
