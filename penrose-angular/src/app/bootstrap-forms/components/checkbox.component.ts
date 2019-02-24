import { Input, Component } from '@angular/core';
import { FieldComponent } from 'src/app/forms/components';
import { BoolField } from '../../../../../penrose-core';

@Component({
    selector: 'pen-bootstrap-checkbox',
    template: `
        <div class="form-group" *ngIf="!field.isHidden">
            <div class="custom-control custom-checkbox mr-sm-2">
                <input type="checkbox" class="custom-control-input" id="{{ field.id }}"
                    [ngModel]="field.getValue()" (ngModelChange)="field.setValue($event)"
                    (blur)="field.isTouched = true"
                    [ngClass]="{ 'is-invalid': field.hasErrors && field.isTouched }"
                    [disabled]="field.isDisabled">
                <label class="custom-control-label" for="{{ field.id }}">{{ field.label }}</label>
            </div>

            <pen-bootstrap-help-text [field]="field"></pen-bootstrap-help-text>
            <pen-bootstrap-invalid-feedback [field]="field"></pen-bootstrap-invalid-feedback>
        </div>
    `
})
export class BootstrapCheckboxComponent implements FieldComponent<BoolField> {
    @Input() field: BoolField;
}
