import { useState, useEffect, useCallback } from 'react';

import { MOVEMENTTYPE } from './useMovements';
import { useFunctionProvider } from '../providers/functionsProvider';

/**
 * @typedef {Object} periodProps
 * @property {string} value
 * @property {Date | undefined} dateTo
 * @property {Date | undefined} dateFrom
 */

/**
 * useFilters
 * @param {Object} params
 * @param {movementObject[]} params.originalMovements
 * @param {string} params.orderBy
 * @param {periodProps} params.period
 * @param {string} params.type
 * @returns  {movementObject[]}
 */
const useFilters = ({ originalMovements, orderBy, period, type }) => {
  const { removeTimeFromDate } = useFunctionProvider();
  const [filteredMovements, setFilteredMovements] = useState(originalMovements);

  useEffect(() => {
    applyFilter(orderBy, period, type);
  }, [originalMovements, applyFilter, orderBy, period, type]);

  const applyFilter = useCallback(
    (orderBy = 'newer', period = { value: 'all' }, type = 'everything') => {
      setFilteredMovements(
        originalMovements
          // Periodo
          .filter((movement) => switchPeriod(movement, period))
          // Tipo
          .filter((movement) => switchType(movement, type))
          // Order by
          .sort((a, b) =>
            orderBy === 'newer'
              ? new Date(b.date) - new Date(a.date)
              : new Date(a.date) - new Date(b.date)
          )
      );
    },
    [originalMovements, switchPeriod, switchType]
  );

  const switchPeriod = useCallback(
    (movement, period) => {
      // Mes actual
      const currentMonth = new Date().getMonth();

      switch (period.value) {
        case 'all':
          return originalMovements;
        case 'current':
          return new Date(movement.date).getMonth() === currentMonth;
        case 'last':
          return new Date(movement.date).getMonth() === currentMonth - 1;
        case 'date':
          return (
            new Date(movement.date) >= removeTimeFromDate(period.dateFrom) &&
            new Date(movement.date) <= removeTimeFromDate(period.dateTo)
          );
      }
    },
    [originalMovements, removeTimeFromDate]
  );

  const switchType = useCallback((movement, type) => {
    switch (type) {
      case 'everything':
        return movement;
      case MOVEMENTTYPE.INCOME:
        return movement.type === MOVEMENTTYPE.INCOME;
      case MOVEMENTTYPE.SPEND:
        return movement.type === MOVEMENTTYPE.SPEND;
    }
  }, []);

  return filteredMovements;
};

export default useFilters;
