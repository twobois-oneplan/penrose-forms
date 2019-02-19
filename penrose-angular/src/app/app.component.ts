import { Component, Input } from '@angular/core';
import { setFormValues, getFormValues } from '../../../penrose-core/form';
import { FormComponent, FormArrayComponent } from './forms';
import {
    PersonDto, createPersonForm, PersonForm, EmployeeDto,
    ProductDto, OrderForm, AddressForm, createOrderForm, OrderDto, ProductOrderDto, ProductOrderFormArray, ProductOrderForm, RegisterForm, createRegisterForm
} from './form-definitions';
import { FormArray } from '../../../penrose-core';

@Component({
    selector: 'pen-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public employees: EmployeeDto[] = [
        { firstName: 'Daniel', lastName: 'Bauer' },
        { firstName: 'Bernhard', lastName: 'Mayr' }
    ];

    public products: ProductDto[] = [
        { id: 1, name: 'Coca Cola', price: 1 },
        { id: 2, name: 'Fanta', price: 2 }
    ];

    // TODO: add disabled state
    public personForm: PersonForm;
    public orderForm: OrderForm;
    public registerForm: RegisterForm;

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

        this.personForm = createPersonForm();
        setFormValues(this.personForm, personDto);

        const orderDto: OrderDto = {
            name: '',
            description: 'Das ist eine Beschreibung',
            employee: this.employees[0],
            products: [
                { product: 1, count: 2 },
                { product: 2, count: 1 },
            ]
        };

        this.orderForm = createOrderForm(this.employees, this.products);
        setFormValues(this.orderForm, orderDto);

        this.registerForm = createRegisterForm();
        setFormValues(this.registerForm, { email: 'pangeax@github.com' });
    }

    // TODO: implement example

    // public addOrderProduct(): void {
    //     const product = this.products[0];
    //     // this.orderForm.fields.products.push(this.getProductOrderModel(product));
    // }

    // public getProductOrderModel(product: ProductDto): ProductOrderForm {
    //     return new ProductOrderForm({
    //         product: createDropdownField<number, ProductDto>({
    //             value: product.id,
    //             options: this.products,
    //             optionLabel: p => p.name,
    //             optionValue: p => p.id,
    //             label: 'Products'
    //         }),
    //         count: createNumberField({ value: 1, label: 'Anzahl' })
    //     });
    // }

    public savePerson() {
        const dto = getFormValues(this.personForm);
        console.log(dto);
    }
}

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

@Component({
  selector: 'pen-product-order-list',
  template: `
      <h4>Products</h4>
      <div *ngFor="let form of formArray.forms">
        <pen-form-group [field]="form"></pen-form-group>
      </div>
  `
})
export class ProductOrderListComponent implements FormArrayComponent<ProductOrderFormArray> {
  @Input() formArray: ProductOrderFormArray;
}

@Component({
  selector: 'pen-product-order-form',
  template: `
    <div class="form-row">
      <pen-form-group class="col-md-8" [field]="form.fields.product"></pen-form-group>
      <pen-form-group class="col-md-4" [field]="form.fields.count"></pen-form-group>
    </div>
  `
})
export class ProductOrderFormComponent implements FormComponent<ProductOrderForm> {
  @Input() form: ProductOrderForm;
}
