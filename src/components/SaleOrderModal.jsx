import React, { useEffect } from "react";
import Select from "react-select";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Box,
  background,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import makeAnimated from "react-select/animated";

import { useSaleOrders } from "../hooks/useSaleOrders";

const SaleOrderModal = ({ isOpen, onClose, saleOrder = null }) => {
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: saleOrder || {
      customer_name: "",
      items: [],
      price: "",
      invoice_no: "",
      invoice_date: new Date().toString(),
    },
  });

  const { mutate, updateMutate, refetch } = useSaleOrders();
  const toast = useToast();

  useEffect(() => {
    if (saleOrder) {
      for (const [key, value] of Object.entries(saleOrder)) {
        setValue(key, value);
      }
    }
  }, [saleOrder, setValue]);

  const onSubmit = (data) => {
    console.log(data, "Data");
    if (saleOrder) {
      updateMutate(data, {
        onSuccess: () => {
          toast({ title: "Sale order updated", status: "success" });
          onClose();
          refetch();
        },
      });
    } else {
      mutate(data, {
        onSuccess: () => {
          toast({ title: "Sale order saved", status: "success" });
          onClose();
          refetch();
        },
      });
    }
  };

  const animatedComponents = makeAnimated();

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "white",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "white",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "lightgray" : "white",
      color: "black",
      "&:hover": {
        backgroundColor: "lightgray",
      },
    }),
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {saleOrder ? "Edit Sale Order" : "Create Sale Order"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mb="4">
              <FormLabel>Customer Name</FormLabel>
              <Input {...register("customer_name", { required: true })} />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Invoice No</FormLabel>
              <Input {...register("invoice_no", { required: true })} />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Price</FormLabel>
              <Input {...register("price", { required: true })} />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Invoice Date</FormLabel>
              <Controller
                name="invoice_date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Products</FormLabel>
              <Controller
                name="items"
                control={control}
                render={({ field }) => (
                  <Select
                    sx={{ backgroundColor: "black" }}
                    styles={customStyles}
                    components={animatedComponents}
                    closeMenuOnSelect={false}
                    isMulti
                    options={[
                      { label: "Sku 23", value: "Sku 23" },
                      { label: "Sku 24", value: "Sku 24" },
                      { label: "Sku 25", value: "Sku 25" },
                    ]}
                    {...field}
                  ></Select>
                )}
              />
            </FormControl>
            <Button type="submit">{saleOrder ? "Update" : "Create"}</Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SaleOrderModal;
