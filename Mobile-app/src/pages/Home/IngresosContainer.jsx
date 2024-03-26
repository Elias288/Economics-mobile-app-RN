import { useState, ReactNode } from "react";
import { Text } from "react-native";
import { Card } from "react-native-paper";
import generalStyles from "../../generalStyles.js";
import AmountsTable from "../../components/AmountsTable";
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
export const IngresosContainer = () => {
  const [tableContent, setTableContent] = useState(
    /** @type {Array<tableContent>} */ (categories)
  );

  return (
    <Card style={generalStyles.card}>
      <Text style={generalStyles.textSubtitle}>Income</Text>

      <AmountsTable tableContent={tableContent} />
    </Card>
  );
};
