import { Component, Input } from '@angular/core';
import { Required, Min, Max, MustBeTrue } from '../../../penrose-core';
import {
    TextField, TextareaField, NumberField, DropdownField, BoolField, Field,
} from '../../../penrose-core/field';
import { setFormValues, Form, getFormValues } from '../../../penrose-core/form';
import { FormComponent } from './forms';

export interface PersonDto {
    firstName: string;
    lastName: string;
    age: number;
    isNice: boolean;
    address: AddressDto;
}

export interface AddressDto {
    street: string;
    streetNumber: number;
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

export class PersonForm extends Form<PersonDto> { }
export class AddressForm extends Form<AddressDto> { }

export class OrderForm extends Form<OrderDto> { }
export class ProductOrderForm extends Form<ProductOrderDto> { }

@Component({
    selector: 'pen-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    // TODO: add disabled state

    public personForm = new PersonForm({
        firstName: new TextField({ validators: [Required], label: 'First Name' }),
        lastName: new TextField({ validators: [Required], label: 'Last Name' }),
        age: new NumberField({ validators: [Min(18), Max(25)], label: 'Age' }),
        isNice: new BoolField({ validators: [MustBeTrue], label: 'Is a nice dude' }),
        address: new AddressForm({
            street: new TextField({ label: 'Street' }),
            streetNumber: new NumberField({ label: 'Street Number' }),
        })
    });

    constructor() {
        const personDto: PersonDto = {
            firstName: 'Daniel',
            lastName: 'Bauer',
            age: 23,
            isNice: true,
            address: {
                street: 'Street',
                streetNumber: 23
            }
        };

        setFormValues(this.personForm, personDto);
    }

    public employees: EmployeeDto[] = [
        { firstName: 'Daniel', lastName: 'Bauer' },
        { firstName: 'Bernhard', lastName: 'Mayr' }
    ];

    public products: ProductDto[] = [
        { id: 1, name: 'Coca Cola', price: 1 },
        { id: 2, name: 'Fanta', price: 2 }
    ];

    public orderForm = new OrderForm({
        name: new TextField({ value: '', label: 'Name', helpText: 'Das ist die Bestellungsnummer' }),
        description: new TextareaField({ value: 'Das ist eine Beschreibung', label: 'Beschreibung',
            validators: [Required], rows: 5 }),
        employee: new DropdownField<EmployeeDto, EmployeeDto>({
            value: this.employees[0],
            options: this.employees,
            optionLabel: (m: EmployeeDto) => `${m.firstName} ${m.lastName}`,
            optionValue: e => e,
            label: 'Employee',
            validators: []
        }),
        // products: [
        //     this.getProductOrderModel(this.products[0])
        // ]
    });

    public addOrderProduct(): void {
        const product = this.products[0];
        // this.orderForm.fields.products.push(this.getProductOrderModel(product));
    }

    public getProductOrderModel(product: ProductDto): ProductOrderForm {
        return new ProductOrderForm({
            product: new DropdownField<number, ProductDto>({
                value: product.id,
                options: this.products,
                optionLabel: p => p.name,
                optionValue: p => p.id,
                label: 'Products'
            }),
            count: new NumberField({ value: 1, label: 'Anzahl' })
        });
    }

    public savePerson() {
        const dto = getFormValues(this.personForm);
        console.log(dto);
    }
}

export class OrderField extends Field<OrderDto> { }
export class PersonField extends Field<PersonDto> { }
export class AddressField extends Field<AddressDto> { }

@Component({
    selector: 'pen-address-form',
    template: `
        <h4>Address</h4>
        <div class="form-row">
            <pen-form-group class="col-md-8" [field]="form.fields.street"></pen-form-group>
            <pen-form-group class="col-md-4" [field]="form.fields.streetNumber"></pen-form-group>
        </div>
    `
})
export class AddressFormComponent implements FormComponent<AddressForm> {
    @Input() form: AddressForm;
}
