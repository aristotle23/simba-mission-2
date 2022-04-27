import React from "react";

interface setUserParam {
  id: unknown;
  username: unknown;
  defaultEventId: unknown;
}
export const UserContext = React.createContext({
  user: {
    id: null,
    username: null,
    defaultEventId: null,
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: (e: setUserParam) => e,
});
