import { Input, Component } from '@angular/core';
import { FormInputComponent } from 'src/app/forms/components';
import { Field } from '../../../../../penrose-core';

export class BootstrapPasswordField extends Field<string> { }

@Component({
    selector: 'pen-bootstrap-password-input',
    template: `
        <label>{{ field.label }}</label>
        <input class="form-control" type="password" [(ngModel)]="field.value"
            (blur)="field.setTouched()"
            [ngClass]="{ 'is-invalid': field.hasErrors && field.isTouched }"/>
    `
})
export class BootstrapPasswordInputComponent implements FormInputComponent<BootstrapPasswordField> {
    @Input() field: BootstrapPasswordField;
}
