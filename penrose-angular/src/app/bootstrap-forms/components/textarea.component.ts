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
        this.rows = config.rows;
    }
}

@Component({
    selector: 'pen-bootstrap-textarea',
    template: `
        <div class="form-group">
            <label>{{ field.label }}</label>
            <textarea class="form-control" [(ngModel)]="field.value"
                (blur)="field.setTouched()"
                [attr.cols]="field.cols" [attr.rows]="field.rows"
                [ngClass]="{ 'is-invalid': field.hasErrors && field.isTouched }">
            </textarea>

            <pen-bootstrap-help-text [field]="field"></pen-bootstrap-help-text>
            <pen-bootstrap-invalid-feedback [field]="field"></pen-bootstrap-invalid-feedback>
        </div>
    `
})
export class BootstrapTextareaComponent implements FormInputComponent<BootstrapTextareaField> {
    @Input() field: BootstrapTextareaField;
}
