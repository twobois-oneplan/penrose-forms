import { Component, Input } from '@angular/core';
import { Field } from '../../../../penrose-core';

@Component({
    selector: 'app-form-group',
    template: `
        <div class="form-group">
            <app-form-input-anchor [field]="field"></app-form-input-anchor>
            <small *ngIf="field.helpText !== null" class="form-text text-muted">{{ field.helpText }}</small>

            <ng-content></ng-content>

            <div class="invalid-feedback" *ngIf="field.hasErrors"
                [ngClass]="{ 'd-block': field.hasErrors }">
                <div *ngFor="let error of field.errorMessages">
                    {{ error.message }}
                </div>
            </div>
        </div>
    `
})
export class FormGroupComponent<T> {
    @Input() field: Field<T>;
}
