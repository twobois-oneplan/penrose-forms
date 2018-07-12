import { Input, Component } from '@angular/core';
import { Field } from '../../../../../penrose-core';

@Component({
    selector: 'pen-bootstrap-invalid-feedback',
    template: `
    <div class="invalid-feedback" *ngIf="field.hasErrors && field.isTouched"
        [ngClass]="{ 'd-block': field.hasErrors && field.isTouched }">
        <div *ngFor="let error of field.errorMessages">
            {{ error.message }}
        </div>
    </div>
    `
})
export class BootstrapInvalidFeedbackComponent<T> {
    @Input() field: Field<T>;
}
