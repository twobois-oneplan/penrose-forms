import { Component, Input, ComponentFactoryResolver, OnInit, ViewContainerRef, ViewChild, ElementRef, Type } from '@angular/core';
import { Field, Form } from '../../../../../penrose-core';

import { FieldComponent, FormComponent } from './form-input.component';
import { PenroseFormConfigService } from '../services';

@Component({
    selector: 'pen-form-group',
    template: `
        <template #fieldControl></template>

        <div *ngIf="subFields !== null">
            <pen-form-group *ngFor="let subField of subFields" [field]="subField"></pen-form-group>
        </div>
    `
})
export class FormGroupComponent<T> implements OnInit {
    @Input() field: Field<T> | Form<T>;

    public subFields = null;

    @ViewChild('fieldControl', {read: ViewContainerRef})
    targetRef: ViewContainerRef;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private formConfigService: PenroseFormConfigService
    ) { }

    public ngOnInit() {
        if (this.field instanceof Field) {
            const fieldConfig = this.formConfigService.config.fieldMappings.find(m => m.field.name === this.field.constructor.name);
            if (fieldConfig === undefined) {
                throw new Error(`Field '${this.field.constructor.name}' has no input component mapped`);
            }

            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(<any>fieldConfig.component);
            const componentRef = this.targetRef.createComponent(componentFactory);
            (<FieldComponent<any>>componentRef.instance).field = this.field;
        }

        if (this.field instanceof Form) {
            const formConfig = this.formConfigService.config.formMappings.find(m => m.form.name === this.field.constructor.name);
            const form = <Form<any>>this.field;

            if (formConfig === undefined) {
                this.subFields = Object.keys(form.fields).map(m => form.fields[m]);
            } else {
                const componentFactory = this.componentFactoryResolver.resolveComponentFactory(<any>formConfig.component);
                const componentRef = this.targetRef.createComponent(componentFactory);
                (<FormComponent<any>>componentRef.instance).form = this.field;
            }
        }
    }
}
