import { Required, Min, Max, MustBeTrue, addConditionalValidator, addGlobalValidator, addConditionalDisable, addConditionalHide } from '../../../penrose-core';
import {
     createTextField, createTextareaField, createDropdownField, createNumberField, createBoolField, Field, createPasswordField
} from '../../../penrose-core/field';
import { Form, createForm, getFormValues } from '../../../penrose-core/form';
import { FormArray, createFormArray } from '../../../penrose-core/form-array';

/* Person */
export interface PersonDto {
    firstName: string;
    lastName: string;
    age: number;
    isNice: boolean;
    showAddress: boolean;
    address: AddressDto;
}

// To add better typing when accessing form fields
export interface PersonForm extends Form<PersonDto> {
    fields: {
        firstName: Field<string>
        lastName: Field<string>
        age: Field<number>,
        isNice: Field<boolean>,
        showAddress: Field<boolean>,
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
            isNice: createBoolField({ id: 'isNice1', validators: [MustBeTrue], label: 'Is a nice dude' }),
            showAddress: createBoolField({ id: 'showAddress', label: 'Show Address' }),
            address: createAddressForm()
        }
    }) as PersonForm;

    addConditionalHide<PersonDto, AddressDto>({
        on: form,
        influences: form.fields.address,
        when: [form.fields.showAddress.valueChange],
        isHidden: [(form: PersonForm) => form.fields.showAddress.getValue() === false]
    });

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

/* Regiser Form */
export interface RegisterDto {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface RegisterForm extends Form<RegisterDto> {
    fields: {
        email: Field<string>,
        password: Field<string>,
        confirmPassword: Field<string>
    }
}
export const createRegisterForm = () => {
    const form: RegisterForm = createForm<RegisterDto>({
        formType: 'register',
        fields: {
            email: createTextField({ label: 'Email' }),
            password: createPasswordField({ label: 'Password '}),
            confirmPassword: createPasswordField({ label: 'Confirm Password' })
        }
    }) as RegisterForm;

    addConditionalDisable<RegisterDto, string>({
        on: form,
        influences: form.fields.email,
        when: [form.fields.password.valueChange],
        isDisabled: [
            (form: RegisterForm) => form.fields.password.getValue() == "daniel",
            // (form: RegisterForm) => form.fields.password.getValue() == "daniel2",
        ]
    });

    addConditionalHide<RegisterDto, string>({
        on: form,
        influences: form.fields.email,
        when: [form.fields.password.valueChange],
        isHidden: [
            (form: RegisterForm) => form.fields.password.getValue() == "daniel"
        ]
    });

    addGlobalValidator<RegisterDto, string>({
        on: form,
        influences: form.fields.confirmPassword,
        when: [
            form.fields.password.valueChange,
            form.fields.confirmPassword.valueChange
        ],
        validators: [{
            key: 'confirmEmail',
            isValid: (form: RegisterForm) => {
                const register = getFormValues<RegisterDto>(form);
                return register.password === register.confirmPassword;
            },
            errorMessage: 'ShouldBeTheSame',
        }],
    });

    return form;
};
