import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';

type ProductDetailsParams = {
  id: string;
  customerId: string;
};

type ProductDetailsRouteProp = RouteProp<{ ProductDetails: ProductDetailsParams }, 'ProductDetails'>;

const ProductDetails: React.FC = () => {
  const route = useRoute<ProductDetailsRouteProp>();
  const navigation = useNavigation();
  const { id, customerId } = route.params;

  const [product, setProduct] = useState<any>(null); // Update 'any' to your specific Product type

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

  const handleAddToCart = async () => {
    try {
      const apiUrl = 'http://neodeals.in:4002/api/cart/addProduct';
      const addToCartResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: id,
          customerId: customerId,
        }),
      });


      navigation.navigate('Cart'); 
      console.log(addToCartResponse)
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  if (!product) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      {/* Display product details */}
      <Text>{product.name}</Text>
      <Text>{`Price: $${product.price}`}</Text>
      {/* Other product details */}
      
      {/* Button to add to cart */}
      <Button title="Add to Cart" onPress={handleAddToCart} />
    </View>
  );
};

export default ProductDetails;
