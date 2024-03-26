import { useState, ReactNode } from "react";
import { Text } from "react-native";
import { Card } from "react-native-paper";
import generalStyles from "../../generalStyles.js";
import AmountsTable from "../../components/AmountsTable.jsx";
import "../../types/TableContentType.js";

/** @type {Array<tableContent>} */
const categories = [
  { cat: "Comida", fore: 0, act: 0, diff: 0 },
  { cat: "Regalos", fore: 0, act: 0, diff: 0 },
  { cat: "Salud/Médicos", fore: 0, act: 0, diff: 0 },
  { cat: "Vivienda", fore: 0, act: 0, diff: 0 },
  { cat: "Transporte", fore: 0, act: 0, diff: 0 },
  { cat: "Gastos personales", fore: 0, act: 0, diff: 0 },
  { cat: "Ahorro", fore: 0, act: 0, diff: 0 },
  {
    cat: "Suministro (luz, agua, gas, etc)",
    fore: 0,
    act: "0,00",
    diff: "0,00",
  },
  { cat: "Viajes", fore: 0, act: 0, diff: 0 },
  { cat: "Deudas", fore: 0, act: 0, diff: 0 },
  { cat: "Otros", fore: 0, act: 0, diff: 0 },
  { cat: "Efectivo", fore: 0, act: 0, diff: 0 },
];

/**
 * Componente donde visualizar los gastos registrados
 * @returns {ReactNode}
 */
export const SpendContainer = () => {
  const [tableContent, setTableContent] = useState(
    /** @type {Array<tableContent>} */ (categories)
  );

  return (
    <Card style={generalStyles.card}>
      <Text style={generalStyles.textSubtitle}>Spends</Text>

      <AmountsTable tableContent={tableContent} />
    </Card>
  );
};
