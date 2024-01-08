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
  productId: string;

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
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        {products.map((product) => (
          <TouchableOpacity
            key={product._id}
            style={styles.card}
            onPress={() => handleProductPress(product._id)}
          >
            <Image source={{ uri: product.bannerImage }} style={styles.image} />
            <View style={styles.cardDetails}>
              <Text style={styles.title}>{product.name}</Text>
              <Text style={styles.price}>${product.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.bottomC} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  card: {
    width: '48%',
    aspectRatio: 1, // Maintain aspect ratio (square)
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: '4%', // Adjust the spacing between rows
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: '70%',
    resizeMode: 'cover',
    borderRadius: 2,
  },
  cardDetails: {
    padding: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 8,
  },
  price: {
    fontSize: 14,
     color: '#777',
     marginTop:0,
  },
  bottomC: {
    marginBottom: 280, // Adjust the bottom space as needed
  },
});


