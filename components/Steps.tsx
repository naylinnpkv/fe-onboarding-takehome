export default function Steps({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-between w-[80%] max-w-md m-auto mt-10">
      <div className="flex flex-col items-center">
        <button
          className={`rounded-full w-10 h-10 flex items-center justify-center text-white ${
            step >= 1 ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          1
        </button>
      </div>

      <button
        className={`h-1 flex-1  mx-2  ${
          step > 1 ? "bg-blue-500" : "bg-gray-300"
        }`}
      ></button>

      <div className="flex flex-col items-center">
        <button
          className={`rounded-full w-10 h-10 flex items-center justify-center text-white ${
            step >= 2 ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          2
        </button>
      </div>

      <div
        className={`h-1 flex-1 mx-2 ${
          step > 2 ? "bg-blue-500" : "bg-gray-300"
        }`}
      ></div>
      <div className="flex flex-col items-center">
        <button
          className={`rounded-full w-10 h-10 flex items-center justify-center text-white ${
            step >= 3 ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          3
        </button>
      </div>
    </div>
  );
}
