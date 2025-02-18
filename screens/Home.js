import React from 'react';
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import ProductCard from '../components/controls/ProductCard';
import BottomNav from '../components/layout/BottomNav';
import Colors from '../constants/Colors';

const products = [
  {
    id: '1',
    name: 'Seiko Prospex',
    price: '499.99',
    image: require('../assets/watches/craig-mclachlan-nOhRrpADKXk-unsplash.jpg'),
  },
  {
    id: '2',
    name: 'Seiko 5 Sports',
    price: '299.99',
    image: require('../assets/watches/paul-cuoco-5_kn5-AC9SQ-unsplash.jpg'),
  },
  {
    id: '3',
    name: 'Seiko Presage',
    price: '399.99',
    image: require('../assets/watches/luiz-neto-8qWtz6JbyF8-unsplash.jpg'),
  },
  {
    id: '4',
    name: 'Seiko Astron',
    price: '599.99',
    image: require('../assets/watches/darryl-low-wPUwlOQ6gcU-unsplash.jpg'),
  },
];

export default function Home({ navigation }) {
  const handleProductPress = (product) => {
    navigation.navigate('ProductDetails', {
      productName: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.safeArea}>
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => handleProductPress(item)}
            />
          )}
          keyExtractor={item => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />
      </SafeAreaView>
      <BottomNav navigation={navigation} currentScreen="Home" />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  safeArea: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
});
