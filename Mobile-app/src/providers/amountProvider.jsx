import { createContext, useContext, Context } from "react";
import balanceService from "../services/balanceService";
import "../services/balanceService";

/** @type {Context<balanceServiceProps>} */
const CustomContext = createContext(undefined);

const AmountProvider = ({ children }) => {
  return (
    <CustomContext.Provider value={balanceService()}>
      {children}
    </CustomContext.Provider>
  );
};

export function useAmountContext() {
  const context = useContext(CustomContext);
  if (!context)
    throw Error("useAmountContext debe estar dentro del AmountProvider");

  return context;
}

export default AmountProvider;
