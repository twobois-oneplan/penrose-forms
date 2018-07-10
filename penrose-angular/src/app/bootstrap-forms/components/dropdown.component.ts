import { Input, Component } from '@angular/core';
import { FormInputComponent } from 'src/app/forms/components';
import { Field, FieldConfig } from '../../../../../penrose-core';

export interface BootstrapDropdownFieldConfig<T, TOption> extends FieldConfig<T> {
    options: TOption[];
    optionLabel: (value: TOption) => string;
    optionValue: (value: TOption) => T;
}

export class BootstrapDropdownField<T, TOption> extends Field<T> {
    public options: TOption[];
    public optionLabel: (value: TOption) => string;
    public optionValue: (value: TOption) => T;

    constructor(config: BootstrapDropdownFieldConfig<T, TOption>) {
        super(config);

        this.options = config.options;
        this.optionLabel = config.optionLabel;
        this.optionValue = config.optionValue;
    }
}

@Component({
    selector: 'pen-bootstrap-dropdown-input',
    template: `
        <label>{{ field.label }}</label>
        <select class="custom-select" [(ngModel)]="field.value" (blur)="field.setTouched()">
            <option *ngFor="let option of field.options" [ngValue]="field.optionValue(option)">
                {{field.optionLabel(option)}}
            </option>
        </select>
    `
})
export class BootstrapDropdownComponent implements FormInputComponent<BootstrapDropdownField<any, any>> {
    @Input() field: BootstrapDropdownField<any, any>;
}
