import { Text } from "react-native";
import { Card } from "react-native-paper";
import { generalStyles } from "../../Main";
import AmountsTable from "../../components/AmountsTable";
import { useState } from "react";

/** @type {Array<tableContent>} */
const categories = [
  { cat: "Ahorro", fore: 0, act: 0, diff: 0 },
  { cat: "Sueldo", fore: 0, act: 0, diff: 0 },
  { cat: "Bonificaciones", fore: 0, act: 0, diff: 0 },
  { cat: "Intereses", fore: 0, act: 0, diff: 0 },
];

export const IngresosContainer = () => {
  const [tableContent, setTableContent] = useState(
    /** @type {Array<tableContent>} */ (categories)
  );

  return (
    <Card style={generalStyles.card}>
      <Text style={generalStyles.textSubtitle}>Ingresos</Text>

      <AmountsTable tableContent={tableContent} />
    </Card>
  );
};
