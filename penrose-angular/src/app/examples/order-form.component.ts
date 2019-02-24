import { Component, Input } from "@angular/core";
import {
    OrderForm, createOrderForm, EmployeeDto, OrderDto, ProductDto,
    ProductOrderFormArray, ProductOrderForm, ProductOrderDto
} from "../form-definitions";
import { setFormValues, getFormValues, addForm, getFormArrayValues, setFormArrayValues } from "../../../../penrose-core";
import { FormComponent, FormArrayComponent } from "../forms/components";

@Component({
    selector: 'pen-order-form',
    template: `
        <div class="container mt-3 mb-5">
            <h2>Order Form</h2>
            <form novalidate>
                <pen-form-group [field]="orderForm"></pen-form-group>
                <button class="btn btn-primary" (click)="save()">save</button>
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

    public save(): void {
        console.log(getFormValues(this.orderForm));
    }
}

@Component({
    selector: 'pen-product-order-list',
    template: `
          <div class="row">
            <h4 class="col">Products</h4>
            <div class="col text-right">
                <button class="btn btn-primary" (click)="add()">Add Product</button>
            </div>
          </div>
          <div *ngFor="let form of formArray.forms; let i = index">
                <div class="form-row">
                    <pen-form-group class="col-md-7" [field]="form.fields.product"></pen-form-group>
                    <pen-form-group class="col-md-3" [field]="form.fields.count"></pen-form-group>
                    <div class="col-md-2">
                        <button class="btn btn-danger btn-block" (click)="remove(i)" style="margin-top: 32px">Remove</button>
                    </div>
                </div>
          </div>
    `
})
export class ProductOrderListComponent implements FormArrayComponent<ProductOrderFormArray> {
    @Input() formArray: ProductOrderFormArray;

    public add(): void {
        addForm<ProductOrderDto>(this.formArray, { product: 1, count: 3});

        // OR:

        // const products = getFormArrayValues<ProductOrderDto>(this.formArray);
        // products.push({ product: 1, count: 3 });
        // setFormArrayValues(this.formArray, products);
    }

    public remove(index: number): void {
        this.formArray.forms.splice(index, 1);
    }
}
