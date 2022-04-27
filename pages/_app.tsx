import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import React, { useState } from "react";

import { UserContext } from "@helpers/contexts";

import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [userId, setUserId] = useState(null);
  const value = { userId, setUserId };
  return (
    <UserContext.Provider value={value}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </UserContext.Provider>
  );
}

export default MyApp;
