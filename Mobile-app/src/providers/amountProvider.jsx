import { createContext, useContext } from "react";
import useAmount from "../context/useAmount";

const Context = createContext(undefined);

const AmountProvider = ({ children }) => {
  return <Context.Provider value={useAmount()}>{children}</Context.Provider>;
};

export function useAmountContext() {
  const context = useContext(Context);
  if (!context)
    throw Error("useAmountContext debe estar dentro del AmountProvider");

  return context;
}

export default AmountProvider;
