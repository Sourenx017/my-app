import React from 'react';
import { Image, StyleSheet } from 'react-native';
import seikoLogo from '../../assets/seiko.png';

export default function Logo() {
  return <Image source={seikoLogo} style={styles.logo} />;
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 60,
    resizeMode: 'contain',
    marginVertical: 10,
  },
});
