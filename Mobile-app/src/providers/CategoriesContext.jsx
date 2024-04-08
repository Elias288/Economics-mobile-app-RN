import { createContext, useContext } from 'react';

import { useMovementsContext } from './MovementsContext';
import useCategories from '../hooks/useCategories';

/**
 * @typedef {Object} categoriesProviderProps
 * @property {categoryObject[]} categories
 * @property {(category: string, type: string) => void} addCategory
 * @property {(categoryToDelete: categoryObject) => void} deleteCategory
 */

/** @type {import('react').Context<categoriesProviderProps>} */
const CategoriesContext = createContext(undefined);

export function useCategoriesContext() {
  const context = useContext(CategoriesContext);
  if (!context) throw Error('useAmountContext debe estar dentro del CategoriesProvider');
  return context;
}

const CategoriesProvider = ({ children }) => {
  const { categories, addCategory, deleteCategory } = useCategories();
  const { changeCategory } = useMovementsContext();

  const onDeleteCategory = (categoryToDelete) => {
    // Si la categoría no tiene movimientos, la elimina.
    // Si tiene movimientos, debe:
    // - si no existe la categoría DELETED crearla modificando la categoría a eliminar
    // - si existe la categoría DELETED, elimina la categoría
    // si no tiene movimientos elimina la categoría
    // Si hay movimientos con la categoría eliminada cambiarla a DELETED
    deleteCategory(categoryToDelete.Id);
    changeCategory(categoryToDelete.cat, 'DELETED');
  };

  return (
    <CategoriesContext.Provider
      value={{ categories, addCategory, deleteCategory: onDeleteCategory }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesProvider;
