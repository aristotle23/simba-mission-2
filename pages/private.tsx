import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useState } from "react";

import { UserContext } from "@helpers/contexts";

import Banner from "@components/Banner";
import Shell from "@components/Shell";

export default function Manage() {
  const [bookings, setBookings] = useState([
    {
      dateTime: "",
      eventType: {
        duration: 0,
        title: "",
      },
      attendee: {
        name: "",
        email: "",
      },
    },
  ]);
  const { user } = useContext(UserContext);
  const [eventUrl, setEventUrl] = useState("");

  useEffect(() => {
    if (!user.id) return;
    axios
      .get("/api/bookingIndex", {
        params: {
          userId: user.id,
        },
      })
      .then(({ data }) => {
        setBookings(data);
      });
    setEventUrl(`${window.location.origin}/booking/${user.username}/${user.defaultEventId}`);
  }, [user]);

  return (
    <Shell>
      <header className="bg-white shadow">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
        </div>
      </header>
      <main>
        <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h4 className="text-lg font-bold">
            Default EventType: <small className="text-sm font-medium">{eventUrl}</small>
          </h4>
          <div className="px-4 py-6 sm:px-0">
            <div className="overflow-auto border-4 border-gray-200 border-dashed rounded-lg h-97">
              <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                <div className="border-t border-gray-200">
                  <dl>
                    {bookings.length > 0 ? (
                      bookings.map((booking, i) => {
                        const dateTime = moment(booking.dateTime);
                        const date = dateTime.format("DD MMM YYYY");
                        const from = dateTime.format("hh:mma");
                        const to = dateTime.add(booking.eventType.duration, "minutes").format("hh:mma");

                        return (
                          <div
                            key={i}
                            className="px-4 py-5 border-b-2 bg-gray-50 border-b-grey-500 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium ">
                              <label>{date}</label>
                              <br />
                              <label className="text-gray-500">
                                {from} - {to}
                              </label>
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              <label className="font-bold">
                                {booking.eventType.title} between You and {booking.attendee.name}
                              </label>
                              <br />
                              {booking.attendee.email}
                            </dd>
                          </div>
                        );
                      })
                    ) : (
                      <Banner message="No Records" />
                    )}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Shell>
  );
}
