import { Component, Input } from "@angular/core";
import {
    OrderForm, createOrderForm, EmployeeDto, OrderDto, ProductDto,
    ProductOrderFormArray, ProductOrderForm
} from "../form-definitions";
import { setFormValues } from "../../../../penrose-core";
import { FormComponent, FormArrayComponent } from "../forms/components";

@Component({
    selector: 'pen-order-form',
    template: `
        <div class="container mt-3 mb-5">
            <h2>Order Form</h2>
            <form novalidate>
                <pen-form-group [field]="orderForm"></pen-form-group>
                <button class="btn btn-primary" (click)="savePerson()">save</button>
            </form>
        </div>
    `
})
export class OrderFormComponent {
    public orderForm: OrderForm;

    public employees: EmployeeDto[] = [
        { firstName: 'Daniel', lastName: 'Bauer' },
        { firstName: 'Bernhard', lastName: 'Mayr' },
        { firstName: 'Not Valid', lastName: 'Employee' }
    ];

    public products: ProductDto[] = [
        { id: 1, name: 'Coca Cola', price: 1 },
        { id: 2, name: 'Fanta', price: 2 }
    ];

    constructor() {
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
      <div *ngIf="!form.isHidden">
          <div class="form-row">
          <pen-form-group class="col-md-8" [field]="form.fields.product"></pen-form-group>
          <pen-form-group class="col-md-4" [field]="form.fields.count"></pen-form-group>
          </div>
      </div>
    `
})
export class ProductOrderFormComponent implements FormComponent<ProductOrderForm> {
    @Input() form: ProductOrderForm;
}
