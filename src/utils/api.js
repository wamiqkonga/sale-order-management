const mockSaleOrders = {
  active: [
    {
      id: 1,
      customer_id: 11908,
      items: [{ sku_id: 220, price: 12, quantity: 12 }],
      paid: false,
      invoice_no: 'Invoice - 1212121',
      invoice_date: '2024-05-07',
    },
  ],
  completed: [
    {
      id: 2,
      customer_id: 11909,
      items: [{ sku_id: 221, price: 15, quantity: 10 }],
      paid: true,
      invoice_no: 'Invoice - 1212122',
      invoice_date: '2024-05-06',
    },
  ],
};

export const fetchSaleOrders = async (status) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSaleOrders[status]);
    }, 1000);
  });
};

export const createSaleOrder = async (newOrder) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      mockSaleOrders.active.push({ id: Date.now(), ...newOrder });
      resolve(newOrder);
    }, 1000);
  });
};

export const updateSaleOrder = async (updatedOrder) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockSaleOrders.active.findIndex((order) => order.id === updatedOrder.id);
      if (index !== -1) {
        mockSaleOrders.active[index] = updatedOrder;
      }
      resolve(updatedOrder);
    }, 1000);
  });
};
