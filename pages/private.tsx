import Link from "next/link";

import Shell from "@components/Shell";

export default function Manage() {
  return (
    <Shell>
      <header className="bg-white shadow">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
        </div>
      </header>
      <main>
        <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-gray-200 border-dashed rounded-lg h-96">
              <div>You are signed in</div>
            </div>
          </div>
        </div>
      </main>
    </Shell>
  );
}
