import { Input, Component } from '@angular/core';
import { NumberField } from '../../../../../penrose-core';
import { FormInputComponent } from 'src/app/forms/components/form-input.component';

@Component({
    selector: 'pen-bootstrap-number-input',
    template: `<pen-bootstrap-input [field]="field" type="number"></pen-bootstrap-input>`
})
export class BootstrapNumberInputComponent implements FormInputComponent<NumberField> {
    @Input() field: NumberField;
}
