import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Button, StyleSheet } from 'react-native';

interface CartItem {
  _id: string;
  quantity: number;
  price: number;
  product: {
    _id: string;
    name: string;
    prodImages: string[];
    // Add other properties as needed
  };
  totalCost:number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Your updateQuantity function remains the same
useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://neodeals.in:4002/api/cart/customer/659c454126fcd9a49c82ab9e');
        const data = await response.json();
        setCartItems(data.cartDoc.items);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchCartItems();
  }, []);
  const handleIncrement = (itemId: string) => {
    const updatedCartItems: CartItem[] = cartItems.map((item) => {
      if (item._id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    updateQuantity(itemId, updatedCartItems.find((item) => item._id === itemId)?.quantity || 0);
  };  

  const handleDecrement = (itemId: string) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === itemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    updateQuantity(itemId, updatedCartItems.find((item) => item._id === itemId)?.quantity || 0);
  };

  const handleUpdateCart = async () => {
    try {
      const apiUrl = 'http://neodeals.in:4002/api/cart/updateCart';
      const cartId = '659d999526fcd9a49c82ad22';

      const updateResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartId,
          productMatrix: cartItems.map(({ _id, product, quantity, price }) => ({
            _id,
            product: product._id,
            quantity,
            price,
          })),
        }),
      });

      if (updateResponse.ok) {
        const updatedCartResponse = await updateResponse.json();
        setCartItems(updatedCartResponse.cartDoc.items);
      } else {
        console.error('Error updating cart:', updateResponse.statusText);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.product.prodImages[0] }} style={styles.productImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.productName}>{item.product.name}</Text>
        <View style={styles.quantityContainer}>
          <Button title="-" onPress={() => handleDecrement(item._id)} />
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <Button title="+" onPress={() => handleIncrement(item._id)} />
        </View>
        <Text>{`Price: $${item.price}`}</Text>
      </View>
      
    </View>
  );

  // Your styles remain unchanged

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cart Items</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            style={styles.flatList}
          />
          <Button title="Checkout" onPress={handleUpdateCart} />
        </>
      )}
    </View>
  );
};

 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  flatList: {
    marginTop: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'grey',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});

export default Cart;
 

