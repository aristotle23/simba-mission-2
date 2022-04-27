import axios from "axios";
import React, { Fragment, useState } from "react";

import Banner from "@components/Banner";

export default function BookingForm({ params, setIsBooked }: any) {
  const [dateTime, setDateTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { username, meetingId } = params;
  const [notice, setNotice] = useState(false);

  async function formHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    if (name === "" || email === "" || dateTime === "") {
      return null;
    }

    try {
      const response = await axios.post("/api/booking", {
        dateTime,
        name,
        email,
        meetingId,
        username,
      });
      if (response.status !== 200) {
        setNotice(true);
        return;
      }
      setIsBooked(true);
    } catch (error) {
      setNotice(true);
    }
  }

  return (
    <Fragment>
      {notice && <Banner message={"Metting was not booked"} isDismissable />}
      <form onSubmit={formHandler} method="POST">
        <div className="overflow-hidden shadow sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-6">
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                  Booking Date
                </label>
                <input
                  type="datetime-local"
                  value={dateTime}
                  onInput={(e) => setDateTime(e.currentTarget.value)}
                  id="email-address"
                  required
                  className="block w-full p-2 mt-1 border-2 border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  autoComplete="name"
                  required
                  onInput={(e) => setName(e.currentTarget.value)}
                  className="w-full p-2 mt-1 border-2 border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  required
                  onInput={(e) => setEmail(e.currentTarget.value)}
                  className="w-full p-2 mt-1 border-2 border-gray-400 rounded-md shadow-sm block-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              confirm
            </button>
          </div>
        </div>
      </form>
    </Fragment>
  );
}
