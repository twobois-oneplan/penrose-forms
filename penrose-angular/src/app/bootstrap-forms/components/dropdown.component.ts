import { Input, Component } from '@angular/core';
import { FieldComponent } from 'src/app/forms/components';
import { DropdownField, hasErrors } from '../../../../../penrose-core';

@Component({
    selector: 'pen-bootstrap-dropdown-input',
    template: `
        <div class="form-group" *ngIf="!field.isHidden">
            <label>{{ field.label }}</label>
            <select class="custom-select"
                [ngModel]="field.getValue()" (ngModelChange)="field.setValue($event)"
                (blur)="field.isTouched = true"
                [ngClass]="{ 'is-invalid': hasErrors && field.isTouched }"
                [disabled]="field.isDisabled">
                <option *ngFor="let option of field.options" [ngValue]="field.optionValue(option)">
                    {{field.optionLabel(option)}}
                </option>
            </select>

            <pen-bootstrap-help-text [field]="field"></pen-bootstrap-help-text>
            <pen-bootstrap-invalid-feedback [field]="field"></pen-bootstrap-invalid-feedback>
        </div>
    `
})
export class BootstrapDropdownComponent implements FieldComponent<DropdownField<any, any>> {
    @Input() public field: DropdownField<any, any>;

    public get hasErrors() {
        return hasErrors(this.field);
    }
}
