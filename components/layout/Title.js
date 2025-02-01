import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function Title({ color, title }) {
  return (
    <Text style={[styles.title, { color }]}> {title} </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  }
});
