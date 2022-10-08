import { createContext, useState } from "react";
import { useHistory } from "react-router-dom";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [userState, setUserState] = useState({ accessToken: "" });
  const isUserLogged = () => {
    console.log("user se logovao");
    return userState.accessToken !== "";
  };

  return (
    <UserContext.Provider value={{ userState, setUserState, isUserLogged }}>
      {children}
    </UserContext.Provider>
  );
}
