import { Input, Component } from '@angular/core';
import { FormInputComponent } from 'src/app/forms/components';
import { PasswordField } from '../../../../../penrose-core';

@Component({
    selector: 'pen-bootstrap-password-input',
    template: `<pen-bootstrap-input [field]="field" type="password"></pen-bootstrap-input>`
})
export class BootstrapPasswordInputComponent implements FormInputComponent<PasswordField> {
    @Input() field: PasswordField;
}
