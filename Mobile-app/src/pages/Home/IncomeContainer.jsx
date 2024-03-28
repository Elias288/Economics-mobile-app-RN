import { useState, ReactNode, useEffect } from "react";
import { Text } from "react-native";
import { Card } from "react-native-paper";
import generalStyles from "../../generalStyles.js";
import AmountsTable from "../../components/AmountsTable.jsx";
import { useAmountContext } from "../../providers/amountProvider.jsx";
import "../../types/TableContentType.js";

/** @type {Array<tableContent>} */
const categories = [
  { cat: "Ahorro", fore: 0, act: 0, diff: 0 },
  { cat: "Sueldo", fore: 0, act: 0, diff: 0 },
  { cat: "Bonificaciones", fore: 0, act: 0, diff: 0 },
  { cat: "Intereses", fore: 0, act: 0, diff: 0 },
];

/**
 * Componente donde visualizar los ingresos registrados
 * @returns {ReactNode}
 */
export const IncomeContainer = () => {
  const { incomeCategories, incomeMovements } = useAmountContext();

  const [tableContent, setTableContent] = useState(
    /** @type {Array<tableContent>} */ ([])
  );

  useEffect(() => {
    setTableContent(buildTableData());
  }, [incomeCategories, incomeMovements]);

  const buildTableData = () => {
    return incomeCategories.map((item) => {
      const cat = item.cat;

      const total = incomeMovements.reduce((total, movimiento) => {
        if (movimiento.cat === cat) {
          return total + movimiento.amount;
        }
        return total;
      }, 0);

      return {
        cat: item.cat,
        fore: item.fore,
        act: total,
        diff: 0,
      };
    });
  };

  return (
    <Card style={generalStyles.card}>
      <Text style={generalStyles.textSubtitle}>Income</Text>

      <AmountsTable tableContent={tableContent} />
    </Card>
  );
};
