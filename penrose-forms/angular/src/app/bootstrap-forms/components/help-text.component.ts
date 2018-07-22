import { Input, Component } from '@angular/core';
import { Field } from '../../../../../penrose-core';

@Component({
    selector: 'pen-bootstrap-help-text',
    template: `
        <small *ngIf="field.helpText !== null" class="form-text text-muted">{{ field.helpText }}</small>
    `
})
export class BootstrapHelpTextComponent<T> {
    @Input() field: Field<T>;
}
