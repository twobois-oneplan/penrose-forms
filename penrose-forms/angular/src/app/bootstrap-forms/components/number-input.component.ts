import { Input, Component } from '@angular/core';
import { NumberField, TextField } from '../../../../../penrose-core';
import { FieldComponent } from 'src/app/forms/components/form-input.component';

@Component({
    selector: 'pen-bootstrap-number-input',
    template: `<pen-bootstrap-input [field]="field" type="number"></pen-bootstrap-input>`
})
export class BootstrapNumberInputComponent implements FieldComponent<NumberField> {
    @Input() field: NumberField;
}
