import React, { useState } from 'react';
import {
  Box,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  HStack,
  useColorMode,
  IconButton,
} from '@chakra-ui/react';

import { SunIcon, MoonIcon } from '@chakra-ui/icons';

import SaleOrderModal from './SaleOrderModal.jsx';
import { useSaleOrders } from '../hooks/useSaleOrders';

const MainApp = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const { data: saleOrders = [], refetch, mutate } = useSaleOrders();
  const { colorMode, toggleColorMode } = useColorMode();

  const openModal = (order) => {
    setEditingOrder(order);
    setModalOpen(true);
  };

  const closeModal = () => {
    setEditingOrder(null);
    setModalOpen(false);
    refetch();
  };

  const handleSubmit = (newOrder) => {
    mutate(newOrder);
  };

  const activeOrders = saleOrders.filter(order => !order.completed);
  const completedOrders = saleOrders.filter(order => order.completed);

  return (
    <Box p="4">
      <HStack  justifyContent="space-between" mb="4">
        <Button sx={{marginLeft:"auto"}} onClick={() => openModal(null)}>+ Sale Order</Button>
        <IconButton
          aria-label="Toggle dark mode"
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
        />
      </HStack>
      <Tabs>
        <TabList>
          <Tab>Active Sale Orders</Tab>
          <Tab>Completed Sale Orders</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Customer Name</Th>
                  <Th>Price (₹)</Th>
                  <Th>Last Modified</Th>
                  <Th>Edit/View</Th>
                </Tr>
              </Thead>
              <Tbody>
                {activeOrders.length > 0 ? (
                  activeOrders.map(order => (
                    <Tr key={order.id}>
                      <Td>{order.id}</Td>
                      <Td>
                        <HStack spacing="3">
                          <Avatar size="xs" name={order.customer_name} />
                          <Box>{order.customer_name}</Box>
                        </HStack>
                      </Td>
                      <Td>{order.price}</Td>
                      <Td>{order.invoice_date}</Td>
                      <Td>
                        <Button onClick={() => openModal(order)}>...</Button>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan="5">No active orders</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Customer Name</Th>
                  <Th>Price (₹)</Th>
                  <Th>Invoice Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {completedOrders.length > 0 ? (
                  completedOrders.map(order => (
                    <Tr key={order.id}>
                      <Td>{order.id}</Td>
                      <Td>
                        <HStack spacing="3">
                          <Avatar size="xs" name={order.customer_name} />
                          <Box>{order.customer_name}</Box>
                        </HStack>
                      </Td>
                      <Td>{order.price}</Td>
                      <Td>{order.invoice_date}</Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan="5">No completed orders</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <SaleOrderModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} saleOrder={editingOrder} />
    </Box>
  );
};

export default MainApp;
