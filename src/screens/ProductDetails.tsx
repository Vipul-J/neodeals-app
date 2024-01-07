// ProductDetails.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
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
  
const ProductDetails: React.FC<{ route: { params: { id: string } } }> = ({ route }) => {
  const { id } = route.params;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://neodeals.in:4002/api/products/${id}`);
        const data = await response.json();
        setProduct(data.product);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <Text>Loading...</Text>; // Add loading state indicator
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.prodImages[0] }} style={styles.image} resizeMode="cover" />
      <Text style={styles.text}>{product.name}</Text>
      <Text style={styles.text}>{`Price: $${product.price}`}</Text>
      <Text style={styles.text}>{`Description: ${product.desc}`}</Text>
      <Text style={styles.text}>{`Category: ${product.category}`}</Text>
      <Text style={styles.text}>{`SubCategory: ${product.subCategory}`}</Text>
      {/* Render other product details */}
      <Button title="Add to Cart"  />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default ProductDetails;
