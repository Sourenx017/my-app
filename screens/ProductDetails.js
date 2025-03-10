import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Button from '../components/controls/Button';
import BottomNav from '../components/layout/BottomNav';
import { useCart } from '../context/CartContext';
import ColorVariantModal from '../components/controls/modal/ColorVariantModal';

function ProductDetails({ route, navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      gestureEnabled: false,
    });
  }, [navigation]);

  const { productName, price, image, description } = route.params || {};
  const { addToCart } = useCart();
  const [colorModalVisible, setColorModalVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState('Silver');

  const handleAddToCart = () => {
    addToCart({
      id: Date.now().toString(),
      name: productName,
      price,
      image,
      description,
      color: selectedColor,
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
          
          <View style={styles.colorSection}>
            <Text style={styles.colorLabel}>Selected Color: {selectedColor}</Text>
            <Button 
              type="secondary"
              label="Change Color"
              onPress={() => setColorModalVisible(true)}
              style={styles.colorButton}
            />
          </View>
        </View>
        <Button 
          type="primary"
          label="Add to Cart"
          onPress={handleAddToCart}
          style={styles.addToCartButton}
        />
      </ScrollView>
      
      <ColorVariantModal 
        visible={colorModalVisible}
        onClose={() => setColorModalVisible(false)}
        onSelectColor={setSelectedColor}
        selectedColor={selectedColor}
      />
      
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
    alignSelf: 'auto',
    marginHorizontal: 20,
    marginBottom: 20,
    width: 'auto',
  },
  colorSection: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
    marginHorizontal: 20,
    width: 'auto',
  },
  colorLabel: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.family.bold,
    color: Colors.darkGray,
    marginBottom: 10,
  },
  colorButton: {
    marginTop: 10,
  },
});

module.exports = ProductDetails;
