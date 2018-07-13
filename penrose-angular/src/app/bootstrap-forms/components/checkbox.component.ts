import { Input, Component } from '@angular/core';
import { FieldComponent } from 'src/app/forms/components';
import { BoolField } from '../../../../../penrose-core';

@Component({
    selector: 'pen-bootstrap-checkbox',
    template: `
        <div class="form-group">
            <div class="custom-control custom-checkbox mr-sm-2">
                <input type="checkbox" class="custom-control-input" id="seas"
                [(ngModel)]="field.value"
                (blur)="field.setTouched()"
                [ngClass]="{ 'is-invalid': field.hasErrors && field.isTouched }">
                <label class="custom-control-label" for="seas">{{ field.label }}</label>
            </div>

            <pen-bootstrap-help-text [field]="field"></pen-bootstrap-help-text>
            <pen-bootstrap-invalid-feedback [field]="field"></pen-bootstrap-invalid-feedback>
        </div>
    `
})
export class BootstrapCheckboxComponent implements FieldComponent<BoolField> {
    @Input() field: BoolField; // TODO: id
}
