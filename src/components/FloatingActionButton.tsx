import React from 'react';
import { GestureResponderEvent, StyleSheet, View, ViewStyle } from 'react-native';
import { IconButton } from 'react-native-paper';

interface FloatingActionButtonProps {
  containerStyles: ViewStyle,
  buttonAction: ((event: GestureResponderEvent) => void)
}

const FloatingActionButton = ({ containerStyles, buttonAction }: FloatingActionButtonProps) => {
  return (
    <View style={[styles.floatingButton, containerStyles]}>
      <IconButton
        icon="plus-thick"
        iconColor='#fff'
        size={30}
        onPress={buttonAction}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    borderRadius: 50,
    alignSelf: 'flex-end',
    backgroundColor: '#294baf',
    overflow: 'hidden',
  }
})

export default FloatingActionButton;