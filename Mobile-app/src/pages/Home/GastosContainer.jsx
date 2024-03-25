import { Text } from "react-native";
import { Card } from "react-native-paper";
import { generalStyles } from "../../Main";
import AmountsTable from "../../components/AmountsTable";
import { useState } from "react";

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

export const GastosContainer = () => {
  const [tableContent, setTableContent] = useState(
    /** @type {Array<tableContent>} */ (categories)
  );

  return (
    <Card style={generalStyles.card}>
      <Text style={generalStyles.textSubtitle}>Gastos</Text>

      <AmountsTable tableContent={tableContent} />
    </Card>
  );
};
