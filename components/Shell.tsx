import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, ReactNode, useContext, useEffect, useState } from "react";

import { UserContext } from "@helpers/contexts";

export default function Shell(props: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();
  const { setUserId } = useContext(UserContext);

  useEffect(() => {
    if (!loading && !session) {
      router.replace({
        pathname: "/auth/login",
        query: {
          callbackUrl: `${location.pathname}${location.search}`,
        },
      });
    }
    if (status === "authenticated") {
      setUserId(session.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, session]);

  return (
    <Fragment>
      <div className="min-h-full">
        <nav className="bg-gray-800">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="flex items-baseline ml-10 space-x-4">
                    <a
                      href="#"
                      className="px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md"
                      aria-current="page">
                      Bookings
                    </a>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="flex items-center ml-4 md:ml-6">
                  <div className="relative ml-3">
                    <div>
                      <Link href="/api/auth/signout">
                        <a className="flex items-center max-w-xs px-5 py-1 text-white rounded-full bg-sky-600 text-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          Logout
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#"
                className="block px-3 py-2 text-base font-medium text-white bg-gray-900 rounded-md"
                aria-current="page">
                Bookings
              </a>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <Link href="/api/auth/signout">
                    <a className="flex items-center max-w-xs px-5 py-1 text-white rounded-full bg-sky-600 text-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      Logout
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
        {props.children}
      </div>
    </Fragment>
  );
}
