import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Button from '../components/controls/Button';
import BottomNav from '../components/layout/BottomNav';
import { useCart } from '../context/CartContext';

function ProductDetails({ route, navigation }) {
  const { productName, price, image, description } = route.params || {};
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: Date.now().toString(), // temporary id solution
      name: productName,
      price,
      image,
      description,
    });
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image 
            source={image} 
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.details}>
          <Text style={styles.name}>{productName}</Text>
          <Text style={styles.price}>${price}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <Button 
          type="primary"
          label="Add to Cart"
          onPress={handleAddToCart}
          style={styles.addToCartButton}
        />
      </ScrollView>
      <BottomNav navigation={navigation} currentScreen="ProductDetails" />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  imageContainer: {
    height: 300,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    padding: 20,
  },
  name: {
    fontSize: Fonts.size.large,
    fontFamily: Fonts.family.bold,
    color: Colors.darkGray,
    marginBottom: 10,
  },
  price: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.family.regular,
    color: Colors.gray,
    marginBottom: 20,
  },
  description: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.family.regular,
    color: Colors.darkGray,
    marginBottom: 30,
    lineHeight: 24,
  },
  bottomNav: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
  },
  bottomButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  addToCartButton: {
    marginTop: 20,
  },
});

module.exports = ProductDetails;
