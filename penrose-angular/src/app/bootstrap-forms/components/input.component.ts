import { Input, Component } from '@angular/core';
import { Field } from '../../../../../penrose-core';

@Component({
    selector: 'pen-bootstrap-input',
    template: `
        <div class="form-group">
            <label>{{ field.label }}</label>
            <input class="form-control" type="{{ type }}" [(ngModel)]="field.value"
                (blur)="field.setTouched()"
                [ngClass]="{ 'is-invalid': field.hasErrors && field.isTouched }"/>

            <pen-bootstrap-help-text [field]="field"></pen-bootstrap-help-text>
            <pen-bootstrap-invalid-feedback [field]="field"></pen-bootstrap-invalid-feedback>
        </div>
    `
})
export class BootstrapInputComponent<T> {
    @Input() field: Field<T>;
    @Input() type: string;
}
