import { Input, Component } from '@angular/core';
import { Field, getErrorMessages, hasErrors } from '../../../../../penrose-core';

@Component({
    selector: 'pen-bootstrap-invalid-feedback',
    template: `
    <div class="invalid-feedback" *ngIf="hasErrors && field.isTouched"
        [ngClass]="{ 'd-block': (hasErrors && field.isTouched) }">
        <div *ngFor="let error of errorMessages">
            {{ error.message }}
        </div>
    </div>
    `
})
export class BootstrapInvalidFeedbackComponent<T> {
    @Input() field: Field<T>;

    public get errorMessages() {
        return getErrorMessages(this.field);
    }

    public get hasErrors() {
        return hasErrors(this.field);
    }
}
