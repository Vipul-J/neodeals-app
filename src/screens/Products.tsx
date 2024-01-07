import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Product {
  _id: string;
  name: string;
  price: number;
  desc: string;
  category: string;
  subCategory: string;
  prodImages: string[];
  // Add other fields as needed
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://neodeals.in:4002/api/products');
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProducts();
  }, []);

  const navigateToProductDetails = (productId: string) => {
    navigation.navigate('ProductDetails', { productId });
  };

  const renderProduct = ({ item }: { item: Product }) => {
    const screenWidth = Dimensions.get('window').width;
    const imageSize = screenWidth / 2 - 20; // Adjust based on your grid layout

    return (
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() => navigateToProductDetails(item._id)}
      >
        <Image
          source={{ uri: item.prodImages[0] }} // Using the first image from prodImages array
          style={{ width: imageSize, height: imageSize }}
          resizeMode="cover"
        />
        <Text>{item.name}</Text>
        <Text>{`Price: $${item.price}`}</Text>
        {/* Add other product details here */}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={renderProduct}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  productContainer: {
    margin: 5,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
  },
});

export default Products;
