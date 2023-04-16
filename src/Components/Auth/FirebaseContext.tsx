import { createContext } from "react";
export const FirebaseContext = createContext({
    firebase:null,
    database:null,
    storage:null,
    provider:null,
  });