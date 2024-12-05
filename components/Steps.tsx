export default function Steps({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-between w-[80%] max-w-md m-auto mt-10">
      <div className="flex flex-col items-center">
        <div
          className={`rounded-full w-10 h-10 flex items-center justify-center text-white ${
            currentStep >= 1 ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          1
        </div>
      </div>

      <div
        className={`h-1 flex-1  mx-2  ${
          currentStep > 1 ? "bg-blue-500" : "bg-gray-300"
        }`}
      ></div>

      <div className="flex flex-col items-center">
        <div
          className={`rounded-full w-10 h-10 flex items-center justify-center text-white ${
            currentStep >= 2 ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          2
        </div>
      </div>

      <div
        className={`h-1 flex-1 mx-2 ${
          currentStep > 2 ? "bg-blue-500" : "bg-gray-300"
        }`}
      ></div>
      <div className="flex flex-col items-center">
        <div
          className={`rounded-full w-10 h-10 flex items-center justify-center text-white ${
            currentStep >= 3 ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          3
        </div>
      </div>
    </div>
  );
}
