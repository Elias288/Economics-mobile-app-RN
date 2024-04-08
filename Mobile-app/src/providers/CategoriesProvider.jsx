import { randomUUID } from 'expo-crypto';
import { createContext, useContext, useReducer } from 'react';

import { MOVEMENTTYPE, useMovementsContext } from './MovementsProvider';

/**
 * @typedef {Object} categoriesProviderProps
 * @property {categoryObject[]} categories
 */

/** @type {import('react').Context<categoriesProviderProps>} */
const CategoriesContext = createContext(undefined);

export function useCategoriesContext() {
  const context = useContext(CategoriesContext);
  if (!context) throw Error('useAmountContext debe estar dentro del CategoriesProvider');
  return context;
}

const CategoriesProvider = ({ children }) => {
  const { movementsDispatch } = useMovementsContext();

  const defaultCategories = [
    { cat: 'Comida', fore: 0, Id: randomUUID(), type: MOVEMENTTYPE.SPEND },
    { cat: 'Regalos', fore: 0, Id: randomUUID(), type: MOVEMENTTYPE.SPEND },
    { cat: 'Salud/Médicos', fore: 0, Id: randomUUID(), type: MOVEMENTTYPE.SPEND },
    { cat: 'Vivienda', fore: 0, Id: randomUUID(), type: MOVEMENTTYPE.SPEND },
    { cat: 'Transporte', fore: 0, Id: randomUUID(), type: MOVEMENTTYPE.SPEND },
    { cat: 'Gastos personales', fore: 0, Id: randomUUID(), type: MOVEMENTTYPE.SPEND },
    { cat: 'Ahorro', fore: 0, Id: randomUUID(), type: MOVEMENTTYPE.SPEND },
    {
      cat: 'Suministro (luz, agua, gas, etc)',
      fore: 0,
      Id: randomUUID(),
      type: MOVEMENTTYPE.SPEND,
    },
    { cat: 'Viajes', fore: 0, Id: randomUUID(), type: MOVEMENTTYPE.SPEND },
    { cat: 'Deudas', fore: 0, Id: randomUUID(), type: MOVEMENTTYPE.SPEND },
    { cat: 'Otros', fore: 0, Id: randomUUID(), type: MOVEMENTTYPE.SPEND },
    { cat: 'Efectivo', fore: 0, Id: randomUUID(), type: MOVEMENTTYPE.SPEND },

    { cat: 'Ahorro', fore: 0, Id: randomUUID(), type: MOVEMENTTYPE.INCOME },
    { cat: 'Sueldo', fore: 0, Id: randomUUID(), type: MOVEMENTTYPE.INCOME },
    { cat: 'Bonificaciones', fore: 0, Id: randomUUID(), type: MOVEMENTTYPE.INCOME },
    { cat: 'Intereses', fore: 0, Id: randomUUID(), type: MOVEMENTTYPE.INCOME },
  ];

  const [categories, categoryDispatch] = useReducer((state = [], action) => {
    switch (action.type) {
      case 'add_category': {
        return [
          ...state,
          { Id: randomUUID(), cat: action.cat, type: action.categoryType, fore: 0 },
        ];
      }
      case 'remove_category': {
        const categoryToDelete = state.find((category) => category.Id === action.categoryId);
        const hasDeleted = state.some(
          (category) => category.cat === 'DELETED' && category.type === categoryToDelete.type
        ); // existe la categoría DELETED

        if (!hasDeleted) {
          // si no existe la categoría DELETED lo mapea
          return state.map((category) =>
            category.Id === action.categoryId ? { ...category, cat: 'DELETED' } : category
          );
        }

        // si DELETED existe, elimina la categoría
        return state.filter((category) => category.Id !== action.categoryId);
      }
      default: {
        return state;
      }
    }
  }, defaultCategories);

  const onDeleteCategory = (categoryToDelete) => {
    // Si la categoría no tiene movimientos, la elimina.
    // Si tiene movimientos, debe:
    // - si no existe la categoría DELETED crearla modificando la categoría a eliminar
    // - si existe la categoría DELETED, elimina la categoría
    // si no tiene movimientos elimina la categoría
    // Si hay movimientos con la categoría eliminada cambiarla a DELETED
    categoryDispatch({ type: 'remove_category', categoryId: categoryToDelete.Id });
    movementsDispatch({
      type: 'update_category',
      oldCategory: categoryToDelete.cat,
      newCategory: 'DELETED',
    });
  };

  return (
    <CategoriesContext.Provider
      value={{ categories, deleteCategory: onDeleteCategory, categoryDispatch }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesProvider;
