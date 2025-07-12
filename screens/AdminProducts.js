import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import Button from "../components/controls/Button";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import { ProductsService } from "../services/api";

export default function AdminProducts({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "Seiko",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await ProductsService.getAll();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
      Alert.alert("Error", "Could not load products");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!form.name || !form.price) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      const newProduct = await ProductsService.create({
        ...form,
        price: parseFloat(form.price),
      });
      setProducts([...products, newProduct]);
      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        brand: "Seiko",
      });
      Alert.alert("Success", "Product added successfully");
    } catch (error) {
      console.error("Error adding product:", error);
      Alert.alert("Error", "Could not add product");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      category: product.category || "",
      brand: product.brand || "Seiko",
    });
    setEditingId(product.id);
  };

  const handleSaveEdit = async () => {
    if (!form.name || !form.price) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      const updatedProduct = await ProductsService.update(editingId, {
        ...form,
        price: parseFloat(form.price),
      });
      setProducts(
        products.map((p) => (p.id === editingId ? updatedProduct : p))
      );
      setEditingId(null);
      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        brand: "Seiko",
      });
      Alert.alert("Success", "Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
      Alert.alert("Error", "Could not update product");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this product?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              await ProductsService.delete(id);
              setProducts(products.filter((p) => p.id !== id));
              Alert.alert("Success", "Product deleted successfully");
            } catch (error) {
              console.error("Error deleting product:", error);
              Alert.alert("Error", "Could not delete product");
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.productRow}>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>
      <View style={styles.productActions}>
        <Button
          title="Edit"
          onPress={() => handleEdit(item)}
          type="primary"
          style={styles.actionButton}
        />
        <Button
          title="Delete"
          onPress={() => handleDelete(item.id)}
          type="danger"
          style={styles.actionButton}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Management</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Product Name"
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={form.description}
          onChangeText={(text) => setForm({ ...form, description: text })}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={form.price}
          onChangeText={(text) => setForm({ ...form, price: text })}
          keyboardType="decimal-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={form.category}
          onChangeText={(text) => setForm({ ...form, category: text })}
        />

        <Button
          title={editingId ? "Update Product" : "Add Product"}
          onPress={editingId ? handleSaveEdit : handleAdd}
          type="primary"
          disabled={loading}
        />

        {editingId && (
          <Button
            title="Cancel Edit"
            onPress={() => {
              setEditingId(null);
              setForm({
                name: "",
                description: "",
                price: "",
                category: "",
                brand: "Seiko",
              });
            }}
            type="outline"
          />
        )}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary} />
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },
  title: {
    fontSize: Fonts.size.large,
    fontFamily: Fonts.family.bold,
    color: Colors.darkGray,
    marginBottom: 20,
    textAlign: "center",
  },
  form: {
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: Colors.lightGray,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.family.regular,
    color: Colors.darkGray,
    backgroundColor: Colors.white,
  },
  list: {
    flex: 1,
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.family.bold,
    color: Colors.darkGray,
  },
  productPrice: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.family.regular,
    color: Colors.gray,
  },
  productActions: {
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    width: 80,
    marginVertical: 0,
  },
});
