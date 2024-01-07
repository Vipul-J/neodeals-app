// Helper function to handle API requests
export const fetchData = async (url: RequestInfo, options = {}) => {
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    } catch (error) {
      // Handle errors, for instance:
      console.error('Error fetching data:', error);
      throw new Error('Failed to fetch data');
    }
  };
  
  // Authentication and User Management
  export const registerUser = async (userData: any) => {
    const response = await fetchData('http://neodeals.in:4002/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response;
  };
  
  export const loginUser = async (credentials: any) => {
    const response = await fetchData('http://neodeals.in:4002/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return response;
  };
  
  export const fetchUserById = async (userId: any) => {
    const response = await fetchData(`http://neodeals.in:4002/api/user/admin/${userId}`);
    return response;
  };
  
  // Cart Operations
  export const addProductToCart = async (productDetails: any) => {
    const response = await fetchData('http://neodeals.in:4002/api/cart/addProduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productDetails),
    });
    return response;
  };
  
  export const getCartById = async (cartId: any) => {
    const response = await fetchData(`http://neodeals.in:4002/api/cart/id/${cartId}`);
    return response;
  };
  
  export const getCartByCustomer = async (customerId: any) => {
    const response = await fetchData(`http://neodeals.in:4002/api/cart/customer/${customerId}`);
    return response;
  };
  
  export const updateCart = async (updatedCartDetails: any) => {
    const response = await fetchData('http://neodeals.in:4002/api/cart/updateCart', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCartDetails),
    });
    return response;
  };
  
  export const checkoutCart = async (cartId: any) => {
    const response = await fetchData(`http://neodeals.in:4002/api/order/checkout/${cartId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  };
  
  export  const fetchCustomerOrders = async (customerId: any) => {
    const response = await fetchData(`http://neodeals.in:4002/api/customer/orders/${customerId}`);
    return response;
  };
  
  export  const fetchProductById = async (productId: any) => {
    const response = await fetchData(`http://neodeals.in:4002/api/products/${productId}`);
    return response;
  };
  
  export  const fetchOrderById = async (orderId: any) => {
    const response = await fetchData(`http://neodeals.in:4002/api/order/id/${orderId}`);
    return response;
  };