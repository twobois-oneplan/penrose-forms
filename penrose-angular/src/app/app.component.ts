import { Component } from '@angular/core';
import { FormModel, Required, Min, Max, MustBeTrue, setValues, getValues } from '../../../penrose-core';
import {
    BootstrapTextField, BootstrapNumberField, BootstrapCheckboxField, BootstrapTextareaField,
    BootstrapDropdownField
} from './bootstrap-forms/components';

export interface PersonDto {
    firstName: string;
    lastName: string;
    age: number;
    isNice: boolean;
}

export interface ProductDto {
    id: number;
    name: string;
    price: number;
}

export interface EmployeeDto {
    firstName: string;
    lastName: string;
}

export interface OrderDto {
    name: string;
    description: string;
    employee: EmployeeDto;
    products: ProductOrderDto[];
}

export interface ProductOrderDto {
    product: number;
    count: number;
}

@Component({
    selector: 'pen-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    // TODO: add disabled state
    public personForm: FormModel<PersonDto> = {
        firstName: new BootstrapTextField({ validators: [Required], label: 'First Name' }),
        lastName: new BootstrapTextField({ validators: [Required], label: 'Last Name' }),
        age: new BootstrapNumberField({ validators: [Min(18), Max(25)], label: 'Age' }),
        isNice: new BootstrapCheckboxField({ validators: [MustBeTrue], label: 'Is a nice dude' }),
    };

    constructor() {
        const personDto: PersonDto = {
            firstName: 'Daniel',
            lastName: 'Bauer',
            age: 23,
            isNice: true
        };

        setValues(this.personForm, personDto);
    }

    public employees: EmployeeDto[] = [
        { firstName: 'Daniel', lastName: 'Bauer' },
        { firstName: 'Bernhard', lastName: 'Mayr' }
    ];

    public products: ProductDto[] = [
        { id: 1, name: 'Coca Cola', price: 1 },
        { id: 2, name: 'Fanta', price: 2 }
    ];

    public orderForm: FormModel<OrderDto> = {
        name: new BootstrapTextField({ value: '', label: 'Name', helpText: 'Das ist die Bestellungsnummer' }),
        description: new BootstrapTextareaField({ value: 'Das ist eine Beschreibung', label: 'Beschreibung', validators: [Required] }),
        employee: new BootstrapDropdownField<EmployeeDto, EmployeeDto>({
            value: this.employees[0],
            options: this.employees,
            optionLabel: (m: EmployeeDto) => `${m.firstName} ${m.lastName}`,
            optionValue: e => e,
            label: 'Employee',
            validators: []
        }),
        // products: new ArrayField<FormModel<ProductOrderDto>>({ value: [], label: '' })
    };

    public addOrderProduct(): void {
        const product = this.products[0];
        // this.orderForm.products.value.push(this.getProductOrderModel(product));
    }

    public getProductOrderModel(product: ProductDto): FormModel<ProductOrderDto> {
        return ({
            product: new BootstrapDropdownField<number, ProductDto>({
                value: product.id,
                options: this.products,
                optionLabel: p => p.name,
                optionValue: p => p.id,
                label: 'Products'
            }),
            count: new BootstrapNumberField({ value: 1, label: 'Anzahl' })
        });
    }

    public savePerson() {
        const dto = getValues(this.personForm);
        console.log(dto);
    }
}
