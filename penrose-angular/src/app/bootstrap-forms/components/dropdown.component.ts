import { Input, Component } from '@angular/core';
import { FormInputComponent } from 'src/app/forms/components';
import { DropdownField } from '../../../../../penrose-core';

@Component({
    selector: 'pen-bootstrap-dropdown-input',
    template: `
        <div class="form-group">
            <label>{{ field.label }}</label>
            <select class="custom-select" [(ngModel)]="field.value" (blur)="field.setTouched()">
                <option *ngFor="let option of field.options" [ngValue]="field.optionValue(option)">
                    {{field.optionLabel(option)}}
                </option>
            </select>

            <pen-bootstrap-help-text [field]="field"></pen-bootstrap-help-text>
            <pen-bootstrap-invalid-feedback [field]="field"></pen-bootstrap-invalid-feedback>
        </div>
    `
})
export class BootstrapDropdownComponent implements FormInputComponent<DropdownField<any, any>> {
    @Input() field: DropdownField<any, any>;
}
