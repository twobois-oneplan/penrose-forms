import { Input, Component } from '@angular/core';
import { Field, NumberField, TextField, BoolField, PasswordField, DropdownField } from '../../../../penrose-core';

@Component({
    selector: 'app-form',
    template: `
        <form class="container">
            <app-form-group *ngFor="let field of fields" [field]="field"></app-form-group>
        </form>
    `
})
export class FormComponent {
    @Input() model: {};

    public get fields(): Field<any>[] {
        return this.flattenDeep(
            Object.keys(this.model).map(m => this.model[m])
        );
    }

    // TODO
    public flattenDeep(arr1: any[]) {
        return arr1.reduce((acc, val) => Array.isArray(val)
            ? acc.concat(this.flattenDeep(val))
            : acc.concat(val), []);
     }
}

// TODO
export interface FormModel {
    fields: Field<any>[];
}


