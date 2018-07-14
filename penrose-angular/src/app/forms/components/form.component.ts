import { Input, Component } from '@angular/core';
import { Field, FormModel } from '../../../../../penrose-core';

@Component({
    selector: 'pen-form',
    template: `
        <form novalidate>
            <div *ngIf="customLayout.childNodes.length === 0">
                <pen-form-group *ngFor="let field of fields" [field]="field"></pen-form-group>
            </div>

            <div #customLayout>
                <ng-content></ng-content>
            </div>
        </form>
    `
})
export class FormComponent<T extends FormModel<T>> {
    @Input() model: FormModel<T>;

    public get fields(): Field<any>[] {
        return Object.keys(this.model).map(m => this.model[m]);
    }
}
