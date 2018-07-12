import { Input, Component } from '@angular/core';
import { Field } from '../../../../../penrose-core';
import { FormInputComponent } from 'src/app/forms/components/form-input.component';

export class BootstrapNumberField extends Field<number> { }

@Component({
    selector: 'pen-bootstrap-number-input',
    template: `<pen-bootstrap-input [field]="field" type="number"></pen-bootstrap-input>`
})
export class BootstrapNumberInputComponent implements FormInputComponent<BootstrapNumberField> {
    @Input() field: BootstrapNumberField;
}
