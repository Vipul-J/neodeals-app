import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    desc: string;
    category: string;
    subCategory: string;
    prodImages: string[];
    // Add other fields as needed
  };
  quantity: number;
  price: number;
  _id: string;
}

interface CartData {
  _id: string;
  customer: string;
  items: CartItem[];
  totalQty: number;
  totalCost: number;
  createdAt: string;
  // Add other fields as needed
}

const CartScreen: React.FC<{ route: { params?: { cartData?: CartData } } }> = ({ route }) => {
  const cartData = route.params?.cartData;

  if (!cartData) {
    return <Text>No cart data available.</Text>; // You can customize the message here
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Total Quantity: {cartData.totalQty}</Text>
      <Text>Total Cost: {cartData.totalCost}</Text>
      <Text>Items:</Text>
      {cartData.items.map((item) => (
        <View key={item._id} style={styles.itemContainer}>
          <Image source={{ uri: item.product.prodImages[0] }} style={styles.image} />
          <Text>Name: {item.product.name}</Text>
          <Text>Price: {item.price}</Text>
          <Text>Quantity: {item.quantity}</Text>
          {/* Display other item details */}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 12,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  // Other styles
});

export default CartScreen;
