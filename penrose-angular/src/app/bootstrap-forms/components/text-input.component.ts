import { Input, Component } from '@angular/core';
import { FieldComponent } from 'src/app/forms/components';
import { TextField } from '../../../../../penrose-core';

@Component({
    selector: 'pen-bootstrap-text-input',
    template: `<pen-bootstrap-input [field]="field" type="text"></pen-bootstrap-input>`
})
export class BootstrapTextInputComponent implements FieldComponent<TextField> {
    @Input() public field: TextField;
}
