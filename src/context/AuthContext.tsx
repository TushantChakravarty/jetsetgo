import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useState } from "react";

export type AuthContextDataProps = {
  user: boolean;
  signIn: () => void;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState(false);

  function signIn() {
    setUser(true);
  }

  useEffect(()=>{
    AsyncStorage.getItem('user')
    .then((response:any)=>{
      if(response)
      {
        setUser(JSON.parse(response))
      }else{
        setUser(false)
      }
    })
  },[])

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
