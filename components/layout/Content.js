import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Content({ children }) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
