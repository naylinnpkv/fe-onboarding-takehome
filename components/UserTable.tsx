import { User } from "@/types";

interface UserTableProps {
  users: User[];
}

export default function UserTable({ users }: UserTableProps) {
  console.log("USERS", users);
  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
        User Data
      </h1>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 bg-indigo-600 text-white">
              Email
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 bg-indigo-600 text-white">
              About Me
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 bg-indigo-600 text-white">
              Birthdate
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 bg-indigo-600 text-white">
              Address
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {user.aboutMe ? (
                  user.aboutMe
                ) : (
                  <span className="text-gray-400 italic">N/A</span>
                )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {user.birthdate ? (
                  new Date(user.birthdate).toLocaleDateString()
                ) : (
                  <span className="text-gray-400 italic ">N/A</span>
                )}
              </td>
              <td className="break-words">
                {user.address ? (
                  `${user.address.street} ${user.address.city} ${user.address.state} ${user.address.zip}`
                ) : (
                  <span className="text-gray-400 italic ">N/A</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
