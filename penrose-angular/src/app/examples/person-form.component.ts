import { Component, Input } from "@angular/core";
import { PersonForm, PersonDto, createPersonForm, AddressForm } from "../form-definitions";
import { setFormValues, getFormValues } from "../../../../penrose-core";
import { FormComponent } from "../forms/components";

@Component({
    selector: 'pen-person-form',
    template: `
        <div class="container mt-3 mb-5">
            <h2>Person Form</h2>
            <form novalidate>
                <pen-form-group [field]="personForm"></pen-form-group>
                <button class="btn btn-primary" (click)="savePerson()">save</button>
            </form>
        </div>

        <div class="container mb-5">
            <h2>Custom Person Form</h2>
            <form novalidate *ngIf="personForm.fields; let person">
                <div class="form-row">
                    <pen-form-group class="col-md-6" [field]="person.firstName"></pen-form-group>
                    <pen-form-group class="col-md-6" [field]="person.lastName"></pen-form-group>
                </div>

                <div class="form-row">
                    <pen-form-group class="col-md-4" [field]="person.age"></pen-form-group>
                </div>

                <pen-form-group [field]="person.isNice"></pen-form-group>

                <div *ngIf="person.address.fields; let address">
                    <pen-form-group [field]="address.street"></pen-form-group>
                    <pen-form-group [field]="address.streetNumber"></pen-form-group>
                </div>

                <button class="btn btn-primary">Save</button>
            </form>
        </div>
    `
})
export class PersonFormComponent {
    public personForm: PersonForm;

    constructor() {
        const personDto: PersonDto = {
            firstName: 'Daniel',
            lastName: 'Bauer',
            age: 23,
            isNice: true,
            showAddress: false,
            address: {
                street: 'Street',
                streetNumber: 23
            }
        };

        this.personForm = createPersonForm();
        setFormValues(this.personForm, personDto);
    }

    public savePerson() {
        const dto = getFormValues(this.personForm);
        console.log(dto);
    }
}

@Component({
    selector: 'pen-address-form',
    template: `
        <div *ngIf="!form.isHidden">
            <h4>Address</h4>
            <div class="form-row">
                <pen-form-group class="col-md-8" [field]="form.fields.street"></pen-form-group>
                <pen-form-group class="col-md-4" [field]="form.fields.streetNumber"></pen-form-group>
            </div>
        </div>
    `
})
export class AddressFormComponent implements FormComponent<AddressForm> {
    @Input() form: AddressForm;
}
