import React from "react";

export const UserContext = React.createContext({
  userId: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUserId: () => {},
});
