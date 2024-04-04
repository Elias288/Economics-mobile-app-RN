import { useState } from 'react';
import '../types/categoriesType';

import { MOVEMENTTYPE } from './useMovements';

function useCategories() {
  const [spendCategories, setSpendCategories] = useState([
    { cat: 'Comida', fore: 0 },
    { cat: 'Regalos', fore: 0 },
    { cat: 'Salud/Médicos', fore: 0 },
    { cat: 'Vivienda', fore: 0 },
    { cat: 'Transporte', fore: 0 },
    { cat: 'Gastos personales', fore: 0 },
    { cat: 'Ahorro', fore: 0 },
    {
      cat: 'Suministro (luz, agua, gas, etc)',
      fore: 0,
    },
    { cat: 'Viajes', fore: 0 },
    { cat: 'Deudas', fore: 0 },
    { cat: 'Otros', fore: 0 },
    { cat: 'Efectivo', fore: 0 },
  ]);
  const [incomeCategories, setIncomeCategories] = useState([
    { cat: 'Ahorro', fore: 0 },
    { cat: 'Sueldo', fore: 0 },
    { cat: 'Bonificaciones', fore: 0 },
    { cat: 'Intereses', fore: 0 },
  ]);

  /**
   * Agrega categorías de ingresos o gastos
   * @param {string} newCategory Texto de la categoría
   * @param {string} type Tipo = income o spend
   */
  const addCategory = (newCategory, type) => {
    if (type === MOVEMENTTYPE.INCOME) {
      setIncomeCategories([...incomeCategories, { cat: newCategory, fore: 0 }]);
    }

    if (type === MOVEMENTTYPE.SPEND) {
      setSpendCategories([...spendCategories, { cat: newCategory, fore: 0 }]);
    }
  };

  /**
   * Delete Category
   * @param {categoryObject} categoryToDelete
   * @param {string} type
   * @returns {void}
   */
  const deleteCategory = (categoryToDelete, type) => {
    if (type === MOVEMENTTYPE.INCOME) {
      const hasDeleted = incomeCategories.includes('DELETED'); // existe la categoría DELETED

      if (!hasDeleted) {
        // si no existe la categoría DELETED lo mapea
        return setIncomeCategories(
          incomeCategories.map((category) =>
            category.cat === categoryToDelete ? { ...category, cat: 'DELETED' } : category
          )
        );
      }

      // si DELETED existe, elimina la categoría
      setIncomeCategories(incomeCategories.filter((category) => category.cat !== categoryToDelete));
    }

    if (type === MOVEMENTTYPE.SPEND) {
      const hasDeleted = spendCategories.includes('DELETED'); // existe la categoría DELETED

      if (!hasDeleted) {
        // si no existe la categoría DELETED lo mapea
        return setSpendCategories(
          spendCategories.map((category) =>
            category.cat === categoryToDelete ? { ...category, cat: 'DELETED' } : category
          )
        );
      }

      // si DELETED existe, elimina la categoría
      setSpendCategories(spendCategories.filter((category) => category.cat !== categoryToDelete));
    }
  };

  return { spendCategories, incomeCategories, addCategory, deleteCategory };
}

export default useCategories;
