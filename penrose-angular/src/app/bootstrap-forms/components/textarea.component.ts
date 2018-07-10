import { Input, Component } from '@angular/core';
import { FormInputComponent } from 'src/app/forms/components';
import { Field, FieldConfig } from '../../../../../penrose-core';

export interface BootstrapTextareaFieldConfig extends FieldConfig<string> {
    columns?: number;
    rows?: number;
}

export class BootstrapTextareaField extends Field<string> {
    public columns: number;
    public rows: number;

    constructor(config: BootstrapTextareaFieldConfig) {
        super(config);

        this.columns = config.columns;
        this.rows = config.rows || 3;
    }
}

@Component({
    selector: 'pen-bootstrap-textarea',
    template: `
        <label>{{ field.label }}</label>
        <textarea class="form-control" [(ngModel)]="field.value"
            (blur)="field.setTouched()"
            cols="{{ columns }}" rows="{{ rows }}"
            [ngClass]="{ 'is-invalid': field.hasErrors && field.isTouched }">
        </textarea>
    `
})
export class BootstrapTextareaComponent implements FormInputComponent<BootstrapTextareaField> {
    @Input() field: BootstrapTextareaField;
}
