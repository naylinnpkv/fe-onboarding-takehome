export default function SignUp() {
  return (
    <div className="space-y-4">
      <input
        type="email"
        className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
        placeholder="Email"
        value={""}
        onChange={() => {}}
        required
      />
      <input
        type="password"
        className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
        placeholder="Password"
        value={""}
        onChange={() => {}}
        required
      />
    </div>
  );
}
