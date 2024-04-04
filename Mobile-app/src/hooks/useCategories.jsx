import * as Crypto from 'expo-crypto';
import { useState } from 'react';
import '../types/categoriesType';

import { MOVEMENTTYPE } from './useMovements';

function useCategories() {
  const [categories, setCategories] = useState(
    /** @type {categoryObject[]} */ ([
      { cat: 'Comida', fore: 0, Id: Crypto.randomUUID(), type: MOVEMENTTYPE.SPEND },
      { cat: 'Regalos', fore: 0, Id: Crypto.randomUUID(), type: MOVEMENTTYPE.SPEND },
      { cat: 'Salud/Médicos', fore: 0, Id: Crypto.randomUUID(), type: MOVEMENTTYPE.SPEND },
      { cat: 'Vivienda', fore: 0, Id: Crypto.randomUUID(), type: MOVEMENTTYPE.SPEND },
      { cat: 'Transporte', fore: 0, Id: Crypto.randomUUID(), type: MOVEMENTTYPE.SPEND },
      { cat: 'Gastos personales', fore: 0, Id: Crypto.randomUUID(), type: MOVEMENTTYPE.SPEND },
      { cat: 'Ahorro', fore: 0, Id: Crypto.randomUUID(), type: MOVEMENTTYPE.SPEND },
      {
        cat: 'Suministro (luz, agua, gas, etc)',
        fore: 0,
        Id: Crypto.randomUUID(),
        type: MOVEMENTTYPE.SPEND,
      },
      { cat: 'Viajes', fore: 0, Id: Crypto.randomUUID(), type: MOVEMENTTYPE.SPEND },
      { cat: 'Deudas', fore: 0, Id: Crypto.randomUUID(), type: MOVEMENTTYPE.SPEND },
      { cat: 'Otros', fore: 0, Id: Crypto.randomUUID(), type: MOVEMENTTYPE.SPEND },
      { cat: 'Efectivo', fore: 0, Id: Crypto.randomUUID(), type: MOVEMENTTYPE.SPEND },

      { cat: 'Ahorro', fore: 0, Id: Crypto.randomUUID(), type: MOVEMENTTYPE.INCOME },
      { cat: 'Sueldo', fore: 0, Id: Crypto.randomUUID(), type: MOVEMENTTYPE.INCOME },
      { cat: 'Bonificaciones', fore: 0, Id: Crypto.randomUUID(), type: MOVEMENTTYPE.INCOME },
      { cat: 'Intereses', fore: 0, Id: Crypto.randomUUID(), type: MOVEMENTTYPE.INCOME },
    ])
  );

  /**
   * Agrega categorías de ingresos o gastos
   * @param {string} newCategoryName Texto de la categoría
   * @param {string} type Tipo = income o spend
   */
  const addCategory = (newCategoryName, type) => {
    const newCategory = { Id: Crypto.randomUUID(), cat: newCategoryName, type, fore: 0 };
    setCategories([...categories, newCategory]);
  };

  /**
   * Delete Category
   * @param {string} categoryId
   * @returns {void}
   */
  const deleteCategory = (categoryId) => {
    const categoryToDelete = categories.find((category) => category.Id === categoryId);
    const hasDeleted = categories.some(
      (category) => category.cat === 'DELETED' && category.type === categoryToDelete.type
    ); // existe la categoría DELETED
    if (!hasDeleted) {
      // si no existe la categoría DELETED lo mapea
      return setCategories(
        categories.map((category) =>
          category.Id === categoryId ? { ...category, cat: 'DELETED' } : category
        )
      );
    }

    // si DELETED existe, elimina la categoría
    setCategories(categories.filter((category) => category.Id !== categoryId));
  };

  return { categories, addCategory, deleteCategory };
}

export default useCategories;
