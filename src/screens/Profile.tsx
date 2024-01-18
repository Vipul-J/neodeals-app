import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CustomerInfo {
  _id: string;
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  pincode: string;
  user_id: string;
  orderHistory: any[]; // Adjust the type of orderHistory as per your data structure
  __v: number;
}


const Profile: React.FC = () => {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        const response = await fetch('http://neodeals.in:4002/api/customer/id/659c454126fcd9a49c82ab9c');
        if (response.ok) {
          const data = await response.json();
          setCustomerInfo(data.custDoc);
          setLoading(false);
        } else {
          console.error('Error fetching customer info:', response.statusText);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching customer info:', error);
        setLoading(false);
      }
    };

    fetchCustomerInfo();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Customer Profile</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        customerInfo && (
          <View style={styles.infoContainer}>
            <Text>Name: {customerInfo.firstName} {customerInfo.lastName}</Text>
            <Text>Email: {customerInfo.email}</Text>
            <Text>Phone: {customerInfo.phone}</Text>
            <Text>Pincode: {customerInfo.pincode}</Text>
            <Text style={styles.orderHistoryHeader}>Order History:</Text>
            <View>
              {customerInfo.orderHistory.map((orderId: string, index: number) => (
                <Text key={index}>{orderId}</Text>
              ))}
            </View>
          </View>
        )
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
  infoContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  orderHistoryHeader: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  }
  // Add more styles as needed
});

export default Profile;
