import { Input, Component } from '@angular/core';
import { FieldComponent } from 'src/app/forms/components';
import { TextareaField } from '../../../../../penrose-core';

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
export class BootstrapTextareaComponent implements FieldComponent<TextareaField> {
    @Input() public field: TextareaField;
}
