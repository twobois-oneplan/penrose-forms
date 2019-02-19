import { Required, Min, Max, MustBeTrue, addConditionalValidator } from '../../../penrose-core';
import {
     createTextField, createTextareaField, createDropdownField, createNumberField, createBoolField, Field
} from '../../../penrose-core/field';
import { Form, createForm } from '../../../penrose-core/form';
import { FormArray, createFormArray } from '../../../penrose-core/form-array';

/* Person */
export interface PersonDto {
    firstName: string;
    lastName: string;
    age: number;
    isNice: boolean;
    address: AddressDto;
}

// To add better typing when accessing form fields
export interface PersonForm extends Form<PersonDto> {
    fields: {
        firstName: Field<string>
        lastName: Field<string>
        age: Field<number>,
        isNice: Field<boolean>,
        address: AddressForm
    }
}
export const createPersonForm = (): PersonForm => {
    const form = createForm<PersonDto>({
        formType: 'person',
        fields: {
            firstName: createTextField({ validators: [Required], label: 'First Name' }),
            lastName: createTextField({ validators: [], label: 'Last Name' }),
            age: createNumberField({ validators: [Min(18), Max(25)], label: 'Age' }),
            isNice: createBoolField({ validators: [MustBeTrue], label: 'Is a nice dude' }),
            address: createAddressForm()
        }
    }) as PersonForm;

    addConditionalValidator<PersonDto, string>({
        on: form,
        influences: form.fields.lastName,
        when: [form.fields.firstName.valueChange],
        check: [{
            condition: (form: PersonForm) => form.fields.firstName.getValue() === "Daniel2",
            validators: [Required]
        }]
    });

    return form;
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
            description: createTextareaField({ label: 'Beschreibung',
                validators: [Required], rows: 5 }),
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
                label: 'Product'
            }),
            count: createNumberField({ value: 1, label: 'Anzahl' })
        }
    });
};
