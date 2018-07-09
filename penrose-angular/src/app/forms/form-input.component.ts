import { Component, Input } from '@angular/core';
import { NumberField, Field, TextField, PasswordField, BoolField, DropdownField, TextAreaField } from '../../../../penrose-core';

export interface FormInputComponent<T extends Field<any>> {
    field: T;
}

@Component({
    selector: 'app-number-input',
    template: `
        <label>{{ field.label }}</label>
        <input class="form-control" type="number" [(ngModel)]="field.value"
            (blur)="field.setTouched()"
            [ngClass]="{ 'is-invalid': field.hasErrors && field.isTouched }"/>
    `
})
export class NumberInputComponent implements FormInputComponent<NumberField> {
    @Input() field: NumberField;
}

@Component({
    selector: 'app-text-input',
    template: `
        <label>{{ field.label }}</label>
        <input class="form-control" type="text" [(ngModel)]="field.value"
            (blur)="field.setTouched()"
            [ngClass]="{ 'is-invalid': field.hasErrors && field.isTouched }"/>
    `
})
export class TextInputComponent implements FormInputComponent<TextField> {
    @Input() field: TextField;
}

@Component({
    selector: 'app-textarea-input',
    template: `
        <label>{{ field.label }}</label>
        <textarea class="form-control" [(ngModel)]="field.value"
            (blur)="field.setTouched()"
            [ngClass]="{ 'is-invalid': field.hasErrors && field.isTouched }">
        </textarea>
    `
})
export class TextAreaInputComponent implements FormInputComponent<TextAreaField> {
    @Input() field: TextAreaField;
}

@Component({
    selector: 'app-password-input',
    template: `
        <label>{{ field.label }}</label>
        <input class="form-control" type="password" [(ngModel)]="field.value"
            (blur)="field.setTouched()"
            [ngClass]="{ 'is-invalid': field.hasErrors && field.isTouched }"/>
    `
})
export class PasswordInputComponent implements FormInputComponent<PasswordField> {
    @Input() field: PasswordField;
}

@Component({
    selector: 'app-bool-input',
    template: `
        <div class="custom-control custom-checkbox mr-sm-2">
            <input type="checkbox" class="custom-control-input" id="seas"
            [(ngModel)]="field.value"
            (blur)="field.setTouched()"
            [ngClass]="{ 'is-invalid': field.hasErrors && field.isTouched }">
            <label class="custom-control-label" for="seas">{{ field.label }}</label>
        </div>
    `
})
export class BoolInputComponent implements FormInputComponent<BoolField> {
    @Input() field: BoolField; // TODO: id
}

@Component({
    selector: 'app-dropdown-input',
    template: `
        <label>{{ field.label }}</label>
        <select class="custom-select" [(ngModel)]="field.value" (blur)="field.setTouched()">
            <option *ngFor="let option of field.options" [ngValue]="field.optionValue(option)">
                {{field.optionLabel(option)}}
            </option>
        </select>
    `
})
export class DropdownInputComponent implements FormInputComponent<DropdownField<any, any>> {
    @Input() field: DropdownField<any, any>;
}


// TODO: add array component
// @Comment({
//     selector: 'app-'
// })
