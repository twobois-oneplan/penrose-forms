import { Input, Component } from '@angular/core';
import { FormInputComponent } from 'src/app/forms/components';
import { Field } from '../../../../../penrose-core';

export class BootstrapPasswordField extends Field<string> { }

@Component({
    selector: 'pen-bootstrap-password-input',
    template: `<pen-bootstrap-input [field]="field" type="password"></pen-bootstrap-input>`
})
export class BootstrapPasswordInputComponent implements FormInputComponent<BootstrapPasswordField> {
    @Input() field: BootstrapPasswordField;
}
