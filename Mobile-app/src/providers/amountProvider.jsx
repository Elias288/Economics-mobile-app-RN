import { createContext, useContext } from "react";
import balanceService from "../services/balanceService";

/** @type {import('react').Context<import('../services/balanceService').useAmountProps} */
const Context = createContext(undefined);

const AmountProvider = ({ children }) => {
  return (
    <Context.Provider value={balanceService()}>{children}</Context.Provider>
  );
};

export function useAmountContext() {
  const context = useContext(Context);
  if (!context)
    throw Error("useAmountContext debe estar dentro del AmountProvider");

  return context;
}

export default AmountProvider;
