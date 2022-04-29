import React from "react";

export interface setUserParam {
  id: any;
  username: any;
  defaultEventId: any;
}
export const UserContext = React.createContext({
  user: {
    id: null,
    username: null,
    defaultEventId: null,
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUserState: (data: setUserParam) => {},
});
