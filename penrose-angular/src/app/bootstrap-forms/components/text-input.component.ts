import { Input, Component } from '@angular/core';
import { FormInputComponent } from 'src/app/forms/components';
import { Field } from '../../../../../penrose-core';

export class BootstrapTextField extends Field<string> { }

@Component({
    selector: 'pen-bootstrap-text-input',
    template: `
        <label>{{ field.label }}</label>
        <input class="form-control" type="text" [(ngModel)]="field.value"
            (blur)="field.setTouched()"
            [ngClass]="{ 'is-invalid': field.hasErrors && field.isTouched }"/>
    `
})
export class BootstrapTextInputComponent implements FormInputComponent<BootstrapTextField> {
    @Input() field: BootstrapTextField;
}
