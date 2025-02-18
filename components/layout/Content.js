import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export default function Content({ children, style }) {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.black,
  },
});
