import { createContext } from 'react';

export const UserContext = createContext({
  username: null,
  setUsername: (username: string) => {}
});
