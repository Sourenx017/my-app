import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9; // 90% of screen width
const CARD_HEIGHT = CARD_WIDTH * 0.8; // Maintain 4:5 aspect ratio
const IMAGE_HEIGHT = CARD_HEIGHT * 0.7; // Image takes 70% of card height

export default function ProductCard({ product, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image 
          source={typeof product.image === 'string' ? { uri: product.image } : product.image} 
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.details}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignSelf: 'center',
  },
  imageContainer: {
    height: IMAGE_HEIGHT,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: '90%',
    height: '90%',
  },
  details: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: Fonts.family.bold,
    fontSize: Fonts.size.normal,
    color: Colors.darkGray,
  },
  price: {
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.normal,
    color: Colors.gray,
  },
});
