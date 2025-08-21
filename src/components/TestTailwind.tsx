"use client";

export default function TestTailwind() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
          Tailwind CSS Test
        </h1>
        <p className="text-gray-700 text-center mb-6">
          If you can see this styled text, Tailwind CSS is working!
        </p>
        <div className="flex justify-center">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            Test Button
          </button>
        </div>
      </div>
    </div>
  );
}
