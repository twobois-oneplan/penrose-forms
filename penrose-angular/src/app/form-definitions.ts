import { Required, Min, Max, MustBeTrue } from '../../../penrose-core';
import {
  createTextField, createTextareaField, createDropdownField, createNumberField, createBoolField
} from '../../../penrose-core/field';
import { Form, createForm } from '../../../penrose-core/form';
import { FormArray, createFormArray } from '../../../penrose-core/form-array';

/* Person */
export interface PersonDto {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  isNice: boolean;
  address: AddressDto;
}

export interface PersonForm extends Form<PersonDto, "id"> { }
export const createPersonForm = (): PersonForm => {
  return createForm<PersonDto>({
    formType: 'person',
    fields: {
      firstName: createTextField({ validators: [Required], label: 'First Name' }),
      lastName: createTextField({ validators: [Required], label: 'Last Name' }),
      age: createNumberField({ validators: [Min(18), Max(25)], label: 'Age' }),
      isNice: createBoolField({ validators: [MustBeTrue], label: 'Is a nice dude' }),
      address: createAddressForm()
    }
  });
};

/* Address */
export interface AddressDto {
  street: string;
  streetNumber: number;
}

export interface AddressForm extends Form<AddressDto> { }
export const AddressFormType = 'address';
export const createAddressForm = (): AddressForm => {
  return createForm<AddressDto>({
    formType: AddressFormType,
    fields: {
      street: createTextField({ label: 'Street' }),
      streetNumber: createNumberField({ label: 'Street Number' }),
    }
  });
};

/* Order */
export interface OrderDto {
  name: string;
  description: string;
  employee: EmployeeDto;
  products: ProductOrderDto[];
}
export interface EmployeeDto {
  firstName: string;
  lastName: string;
}
export interface ProductDto {
  id: number;
  name: string;
  price: number;
}

export interface OrderForm extends Form<OrderDto> { }
export const createOrderForm = (employees: EmployeeDto[], products: ProductDto[]): OrderForm => {
  return createForm<OrderDto>({
    formType: 'order',
    fields: {
      name: createTextField({ label: 'Name', helpText: 'Das ist die Bestellungsnummer' }),
      description: createTextareaField({
        label: 'Beschreibung',
        validators: [Required], rows: 5
      }),
      employee: createEmployeeDropdownField(employees),
      products: createProductOrderFormArray(products)
    }
  });
};

export const createEmployeeDropdownField = (employees: EmployeeDto[]) => {
  return createDropdownField<EmployeeDto, EmployeeDto>({
    options: employees,
    optionLabel: (m: EmployeeDto) => `${m.firstName} ${m.lastName}`,
    optionValue: e => e,
    label: 'Employee',
    validators: [] // TODO: test validators
  });
};

/* Product Order */
export interface ProductOrderDto {
  product: number;
  count: number;
}

export interface ProductOrderFormArray extends FormArray<ProductOrderDto> { }
export const createProductOrderFormArray = (products: ProductDto[]) => {
  return createFormArray('productOrderList', {
    formFactory: () => createProductOrderForm(products)
  });
};

export interface ProductOrderForm extends Form<ProductOrderDto> { }
export const createProductOrderForm = (products: ProductDto[]): ProductOrderForm => {
  return createForm<ProductOrderDto>({
    formType: 'productOrder',
    fields: {
      product: createDropdownField<number, ProductDto>({
        options: products,
        optionLabel: p => p.name,
        optionValue: p => p.id,
        label: 'Products'
      }),
      count: createNumberField({ value: 1, label: 'Anzahl' })
    }
  });
};
