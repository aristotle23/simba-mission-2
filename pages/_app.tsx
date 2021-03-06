import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import React, { useState } from "react";

import { UserContext, setUserParam } from "@helpers/contexts";

import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [user, setUser] = useState({
    id: null,
    username: null,
    defaultEventId: null,
  });
  const value = {
    user,
    setUserState: function (data: setUserParam) {
      setUser(data);
    },
  };
  return (
    <UserContext.Provider value={value}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </UserContext.Provider>
  );
}

export default MyApp;
