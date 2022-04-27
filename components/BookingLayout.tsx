import { Fragment, ReactNode } from "react";
import { Interface } from "readline";
import internal from "stream";

interface meetingProps {
  meeting: {
    user: {
      name: string;
    };
    title: string;
    description: string;
    duration: number;
  };
  children: ReactNode;
}
export default function BookingLayout(props: meetingProps) {
  const meeting = props.meeting;
  return (
    <Fragment>
      <div className="flex ">
        <div className="container w-2/4 mx-auto mt-20">
          <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h4 className="mb-1 font-bold text-gray-600 text-md">{meeting.user.name}</h4>

                  <h1 className="mb-5 text-2xl font-medium leading-6 text-gray-900">{meeting.title}</h1>
                  <a href="#" className="flex items-start p-0 -ml-4 rounded-lg hover:bg-gray-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-20 h-6"
                      fill="black"
                      viewBox="0 0 24 24"
                      stroke="white"
                      strokeWidth={2}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="ml-0">
                      <p className="mt-0 text-sm text-gray-500">{meeting.description} </p>
                    </div>
                  </a>
                  <a href="#" className="flex items-start p-0 mt-4 rounded-lg -ml-7 hover:bg-gray-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-20 h-6"
                      viewBox="0 0 24 24"
                      fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <div className="-ml-4">
                      <p className="mt-0 text-sm text-gray-500">{meeting.duration} Minutes </p>
                    </div>
                  </a>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">{props.children}</div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
