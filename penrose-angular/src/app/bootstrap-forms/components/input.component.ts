import { Input, Component } from '@angular/core';
import { Field, hasErrors } from '../../../../../penrose-core';

@Component({
    selector: 'pen-bootstrap-input',
    template: `
        <div class="form-group" *ngIf="!field.isHidden">
            <label>{{ field.label }}</label>
            <input class="form-control" type="{{ type }}"
                [ngModel]="field.getValue()" (ngModelChange)="field.setValue($event)"
                (blur)="field.isTouched = true"
                [ngClass]="{ 'is-invalid': hasErrors && field.isTouched }"
                [disabled]="field.isDisabled"/>

            <pen-bootstrap-help-text [field]="field"></pen-bootstrap-help-text>
            <pen-bootstrap-invalid-feedback [field]="field"></pen-bootstrap-invalid-feedback>
        </div>
    `
})
export class BootstrapInputComponent<T> {
    @Input() field: Field<T>;
    @Input() type: string;

    public get hasErrors() {
        return hasErrors(this.field);
    }
}
