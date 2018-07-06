import { Component } from '@angular/core';
import { TextField, NumberField, BoolField, PasswordField, DropdownField, TextAreaField } from '../../../penrose-core';
import { Required, Min, Max, MustBeTrue } from '../../../penrose-core';

export interface PersonForm {
    firstName: TextField;
    lastName: TextField;
    age: NumberField;
    isNice: BoolField;
}

export interface ProductDto {
    id: number;
    name: string;
    price: number;
}

export interface Employee {
    firstName: string;
    lastName: string;
}

export interface OrderModelForm {
    name: TextField;
    description: TextAreaField;
    employee: DropdownField<Employee, Employee>;
    products: ProductOrderModel[];
}

export interface ProductOrderModel {
    product: DropdownField<number, ProductDto>;
    count: NumberField;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public personForm: PersonForm = {
        firstName: new TextField({ value: '', validators: [Required], label: 'First Name' }),
        lastName: new TextField({ value: 'Bauer', validators: [Required], label: 'Last Name' }),
        age: new NumberField({ value: 23, validators: [Min(18), Max(25)], label: 'Age' }),
        isNice: new BoolField({ value: true, validators: [MustBeTrue], label: 'Is a nice dude' })
    };

    public employees: Employee[] = [
        { firstName: 'Daniel', lastName: 'Bauer' },
        { firstName: 'Bernhard', lastName: 'Mayr' }
    ];

    public products: ProductDto[] = [
        { id: 1, name: 'Coca Cola', price: 1 },
        { id: 2, name: 'Fanta', price: 2 }
    ];

    public orderForm: OrderModelForm = {
        name: new TextField({ value: '', label: 'Name', helpText: 'Das ist die Bestellungsnummer' }),
        description: new TextAreaField({ value: 'Das ist eine Beschreibung', label: 'Beschreibung', validators: [Required] }),
        employee: new DropdownField<Employee, Employee>({
            value: this.employees[0],
            options: this.employees,
            optionLabel: (m: Employee) => `${m.firstName} ${m.lastName}`,
            optionValue: e => e,
            label: 'Employee',
            validators: []
        }),
        products: this.products.map(m => this.getProductOrderModel(m))
    };

    public addOrderProduct(): void {
        const product = this.products[0];
        this.orderForm.products.push(this.getProductOrderModel(product));
    }

    public getProductOrderModel(product: ProductDto): ProductOrderModel {
        return ({
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
}
