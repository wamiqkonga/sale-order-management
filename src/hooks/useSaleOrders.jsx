import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

var mockSaleOrders = [
  {
    id: 1,
    customer_name: "Spider",
    price: 100,
    invoice_date: "Tue Jun 04 2024 18:31:54 GMT+0530 (India Standard Time)",
    completed: false,
  },
  {
    id: 2,
    customer_name: "Spider",
    price: 210,
    invoice_date: "Tue Jun 04 2024 18:31:54 GMT+0530 (India Standard Time)",
    completed: true,
  },
];

export const useSaleOrders = () => {
  const queryClient = useQueryClient();

  const { data = [], refetch } = useQuery({
    queryKey: ["saleOrders"],
    queryFn: async () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockSaleOrders), 1000);
      });
    },
  });

  const mutation = useMutation({
    mutationFn: async (order) => {
      return new Promise((resolve) => {
        console.log(order, "order");
        mockSaleOrders.push({ id: mockSaleOrders?.length + 1, ...order });
        setTimeout(() => resolve(order), 1000);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["saleOrders"]);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (order) => {
      return new Promise((resolve) => {
        console.log(order, "order");
        let objIndex = mockSaleOrders.findIndex((obj) => obj.id === order.id);

        mockSaleOrders[objIndex] = order;

        setTimeout(() => resolve(order), 1000);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["saleOrders"]);
    },
  });

  return {
    data,
    refetch,
    mutate: mutation.mutate,
    updateMutate: updateMutation.mutate,
  };
};
