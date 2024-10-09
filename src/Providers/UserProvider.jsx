import { useState, createContext, useEffect, useContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userLoaded, setLoaded] = useState(false);

  useEffect(() => {
    FetchUser();
  }, []);
  useEffect(() => {
    setLoaded(true);
  }, [user]);

  const FetchUser = () => {
    setUser({ username: "tibor_paragh", id: 343544, avatar: "none" });
  };
  const ReloadUser = () => {
    //itt újra lekérdezni a usert
    setUser({
      username: "tibor_paragh reloaded sresres",
      id: 343544,
      avatar: "none",
    });
  };
  const UploadAvatar = (url) => {
    return url;
  };
  return (
    <UserContext.Provider value={{ user, setUser, ReloadUser, UploadAvatar }}>
      {userLoaded ? children : "user loading, please wait"}
    </UserContext.Provider>
  );
};
