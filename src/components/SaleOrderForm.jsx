import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MultiSelect } from 'chakra-multiselect';
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

const SaleOrderForm = ({ onSubmit, defaultValues }) => {
  const { register, handleSubmit, control } = useForm({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl mb="4">
        <FormLabel>Customer ID</FormLabel>
        <Input {...register('customer_id', { required: true })} />
      </FormControl>
      <FormControl mb="4">
        <FormLabel>Invoice No</FormLabel>
        <Input {...register('invoice_no', { required: true })} />
      </FormControl>
      <FormControl mb="4">
        <FormLabel>Invoice Date</FormLabel>
        <Controller
          name="invoice_date"
          control={control}
          render={({ field }) => <DatePicker selected={field.value} onChange={field.onChange} />}
        />
      </FormControl>
      <FormControl mb="4">
        <FormLabel>Items</FormLabel>
        <Controller
          name="items"
          control={control}
          render={({ field }) => (
            <MultiSelect
              options={[
                { label: 'Item 1', value: 'item1' },
                { label: 'Item 2', value: 'item2' },
                { label: 'Item 3', value: 'item3' },
              ]}
              {...field}
            />
          )}
        />
      </FormControl>
      <Button type="submit">{defaultValues ? 'Update' : 'Create'}</Button>
    </form>
  );
};

export default SaleOrderForm;
