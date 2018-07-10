import { Input, Component } from '@angular/core';
import { Field } from '../../../../../penrose-core';
import { FormInputComponent } from 'src/app/forms/components/form-input.component';

export class BootstrapNumberField extends Field<number> { }

@Component({
    selector: 'pen-bootstrap-number-input',
    template: `
        <label>{{ field.label }}</label>
        <input class="form-control" type="number" [(ngModel)]="field.value"
            (blur)="field.setTouched()"
            [ngClass]="{ 'is-invalid': field.hasErrors && field.isTouched }"/>
    `
})
export class BootstrapNumberInputComponent implements FormInputComponent<BootstrapNumberField> {
    @Input() field: BootstrapNumberField;
}
