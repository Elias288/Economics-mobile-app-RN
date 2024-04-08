import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Card, SegmentedButtons } from 'react-native-paper';

import { generalStyles, getColors } from '../generalStyles';
import useFilters from '../hooks/useFilters';
import { MOVEMENTTYPE } from '../hooks/useMovements';

/**
 * Movements Filters
 * @param {Object} params
 * @param {React.ReactNode} params.children
 * @param {movementObject[]} params.originalMovements
 * @returns
 */
function MovementsFilters({ children, originalMovements }) {
  const [showFilters, setShowFilters] = useState(false);
  const [dateFrom, setDateFrom] = useState({ open: false, date: new Date(), showDate: false });
  const [dateTo, setDateTo] = useState({ open: false, date: new Date(), showDate: false });
  const [orderBy, setOrderBy] = useState('newer');
  const [period, setPeriod] = useState({ value: 'all', dateTo: undefined, dateFrom: undefined });
  const [type, setType] = useState('everything');

  const filteredMovements = useFilters({ originalMovements, orderBy, period, type });
  const colors = getColors();

  const showDateFrom = () => {
    DateTimePickerAndroid.open({
      testID: 'dateTimePicker',
      value: dateFrom.date,
      mode: 'date',
      is24Hour: true,

      onChange: (evt, selectedDate) => {
        if (evt.type === 'set') setDateFrom({ ...dateFrom, date: selectedDate, showDate: true });
      },
    });
  };

  const showDateTo = () => {
    DateTimePickerAndroid.open({
      testID: 'dateTimePicker',
      value: dateTo.date,
      mode: 'date',
      is24Hour: true,
      onChange: (evt, selectedDate) => {
        if (evt.type === 'set') setDateTo({ ...dateTo, date: selectedDate, showDate: true });
      },
    });
  };

  return (
    <>
      <Card style={generalStyles.card}>
        {showFilters && (
          <View style={{ marginBottom: 10 }}>
            {/* Order by date */}
            <View style={{ marginBottom: 10 }}>
              <Text>Order by</Text>
              <SegmentedButtons
                value={orderBy}
                onValueChange={setOrderBy}
                buttons={[
                  { value: 'newer', label: 'Newer first' },
                  { value: 'oldest', label: 'Oldest first' },
                ]}
              />
            </View>

            {/* Period */}
            <View style={{ marginBottom: 10 }}>
              <Text>Period (Month)</Text>
              <SegmentedButtons
                value={period.value}
                onValueChange={(value) => {
                  setPeriod({ value });
                  setDateFrom({ ...dateFrom, date: new Date(), showDate: false });
                  setDateTo({ ...dateTo, date: new Date(), showDate: false });
                }}
                buttons={[
                  { value: 'all', label: 'All' },
                  { value: 'current', label: 'Current' },
                  { value: 'last', label: 'Last' },
                ]}
              />

              {/* Date from */}
              <View style={styles.dateContainer}>
                <Text>Date From: </Text>
                <Button
                  mode="contained"
                  onPress={showDateFrom}
                  style={{
                    backgroundColor: dateFrom.showDate ? colors.lightPurple : colors.purple,
                  }}
                >
                  {dateFrom.date.toLocaleDateString()}
                </Button>
              </View>
              {/* Date to */}
              <View style={{ ...styles.dateContainer, paddingBottom: 10 }}>
                <Text>Date To: </Text>
                <Button
                  mode="contained"
                  onPress={showDateTo}
                  style={{
                    backgroundColor: dateTo.showDate ? colors.lightPurple : colors.purple,
                  }}
                >
                  {dateTo.date.toLocaleDateString()}
                </Button>
              </View>

              <Button
                mode="contained"
                disabled={!dateTo.showDate || !dateFrom.showDate}
                onPress={() => {
                  setPeriod({ value: 'date', dateTo: dateTo.date, dateFrom: dateFrom.date });
                }}
              >
                Filter
              </Button>
            </View>

            {/* Type */}
            <View style={{ marginBottom: 10 }}>
              <Text>Type</Text>
              <SegmentedButtons
                value={type}
                onValueChange={setType}
                buttons={[
                  { value: 'everything', label: 'Everything' },
                  { value: MOVEMENTTYPE.INCOME, label: 'Income' },
                  { value: MOVEMENTTYPE.SPEND, label: 'Spend' },
                ]}
              />
            </View>
          </View>
        )}

        {/* Show/Hide filters */}
        <Button mode="contained" onPress={() => setShowFilters(!showFilters)}>
          {!showFilters ? 'Add' : 'Hide'} filters
        </Button>
      </Card>

      <Card style={generalStyles.card}>
        {/* Clones the child and passes the filtered list on to it */}
        {React.cloneElement(children, { movements: filteredMovements })}
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    gap: 5,
    paddingTop: 10,
    alignItems: 'center',
  },
});

export default MovementsFilters;
