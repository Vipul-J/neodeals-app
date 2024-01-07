import { TabsStackScreenProps } from "../navigators/TabsNavigator";
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';

interface Product {
  _id: string;
  bannerImage: string;
  name: string;
  price: number;
  desc: string;
  category: string;
  // Add other properties as needed
}

export const Electronics = ({ navigation }: TabsStackScreenProps<"Electronics">) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>('http://neodeals.in:4002/api/products/category/Electronics');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetails', { id: productId });
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {products.map((product) => (
                <TouchableOpacity key={product._id} onPress={() => handleProductPress(product._id)}>

        <View key={product._id} style={styles.card}>
          <Image source={{ uri: product.bannerImage }} style={styles.image} />
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.description}>{product.desc}</Text>
          <Text style={styles.description}>{product.category}</Text>

        </View>
        </TouchableOpacity>

      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  card: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#fff', // White background color for the cards
    borderRadius: 10,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000', // Shadow properties for a better visual effect
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
    borderRadius: 10, // Adding border radius to the image
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  price: {
    fontSize: 14,
    marginTop: 4,
    color: '#777', // Adjust the price text color as needed
  },
  description: {
    fontSize: 12,
    marginTop: 4,
    color: '#777', // Adjust the description text color as needed
  },
});
