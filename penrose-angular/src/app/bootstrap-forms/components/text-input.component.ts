import { Input, Component } from '@angular/core';
import { FormInputComponent } from 'src/app/forms/components';
import { Field } from '../../../../../penrose-core';

export class BootstrapTextField extends Field<string> { }

@Component({
    selector: 'pen-bootstrap-text-input',
    template: `<pen-bootstrap-input [field]="field" type="text"></pen-bootstrap-input>`
})
export class BootstrapTextInputComponent implements FormInputComponent<BootstrapTextField> {
    @Input() field: BootstrapTextField;
}
