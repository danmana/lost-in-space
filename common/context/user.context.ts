import { createContext } from 'react';

export const UserContext = createContext({
  username: undefined,
  setUsername: (username: string) => {}
});
