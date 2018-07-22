import { Input, Component } from '@angular/core';
import { FieldComponent } from 'src/app/forms/components';
import { TextareaField, hasErrors } from '../../../../../penrose-core';

// TODO: Validation not showing..
@Component({
    selector: 'pen-bootstrap-textarea',
    template: `
        <div class="form-group">
            <label>{{ field.label }}</label>
            <textarea class="form-control"
                [ngModel]="field.getValue()" (ngModelChange)="field.setValue($event)"
                (blur)="field.isTouched = true"
                [attr.cols]="field.cols" [attr.rows]="field.rows"
                [ngClass]="{ 'is-invalid': hasErrors && field.isTouched }">
            </textarea>

            <pen-bootstrap-help-text [field]="field"></pen-bootstrap-help-text>
            <pen-bootstrap-invalid-feedback [field]="field"></pen-bootstrap-invalid-feedback>
        </div>
    `
})
export class BootstrapTextareaComponent implements FieldComponent<TextareaField> {
    @Input() public field: TextareaField;

    public get hasErrors() {
        return hasErrors(this.field);
    }
}