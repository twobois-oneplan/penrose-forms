import { Input, Component } from '@angular/core';
import { Field, FormModel } from '../../../../penrose-core';

@Component({
    selector: 'app-form',
    template: `
        <form class="container">
            <app-form-group *ngFor="let field of fields" [field]="field"></app-form-group>
        </form>
    `
})
export class FormComponent<T extends FormModel<T>> {
    @Input() model: FormModel<T>;

    public get fields(): Field<any>[] {
        return Object.keys(this.model).map(m => this.model[m]);
    }
}
