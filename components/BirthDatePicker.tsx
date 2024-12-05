export default function BirthdatePicker() {
  return (
    <div className="flex flex-col space-y-4">
      <label className="text-gray-700 font-semibold">
        Select Your Birthdate
      </label>
      <div className="flex space-x-4">
        {/* Day Selector */}
        <select className="border border-gray-300 rounded-lg p-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="">Day</option>
          {Array.from({ length: 31 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        {/* Month Selector */}
        <select className="border border-gray-300 rounded-lg p-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="">Month</option>
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((month, index) => (
            <option key={index + 1} value={index + 1}>
              {month}
            </option>
          ))}
        </select>

        {/* Year Selector */}
        <select className="border border-gray-300 rounded-lg p-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="">Year</option>
          {Array.from(
            { length: 120 },
            (_, i) => new Date().getFullYear() - i
          ).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
