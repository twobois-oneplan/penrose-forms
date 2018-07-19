import { Component, Input, ComponentFactoryResolver, OnInit, ViewContainerRef, ViewChild, ElementRef, Type } from '@angular/core';
import { Field, Form } from '../../../../../penrose-core';

import { FieldComponent, FormComponent } from './form-input.component';
import { PenroseFormConfigService } from '../services';
import { FormArray } from '../../../../../penrose-core/form-array';

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
    @Input() field: Field<T> | Form<T> | FormArray<T>;

    public subFields = null;

    @ViewChild('fieldControl', {read: ViewContainerRef})
    targetRef: ViewContainerRef;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private formConfigService: PenroseFormConfigService
    ) { }

    public ngOnInit() {
        if (this.field.type === 'field') {
            const field = <Field<any>>this.field;

            const fieldConfig = this.formConfigService.config.fieldMappings.find(m => m.field === field.fieldType);
            if (fieldConfig === undefined) {
                throw new Error(`Field '${field.fieldType}' has no input component mapped`);
            }

            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(<any>fieldConfig.component);
            const componentRef = this.targetRef.createComponent(componentFactory);
            (<FieldComponent<any>>componentRef.instance).field = field;
        }

        if (this.field.type === 'form') {
            const form = <Form<any>>this.field;
            const formConfig = this.formConfigService.config.formMappings.find(m => m.form === form.formType);

            if (formConfig === undefined) {
                this.subFields = Object.keys(form.fields).map(m => form.fields[m]);
            } else {
                const componentFactory = this.componentFactoryResolver.resolveComponentFactory(<any>formConfig.component);
                const componentRef = this.targetRef.createComponent(componentFactory);
                (<FormComponent<any>>componentRef.instance).form = form;
            }
        }

        if (this.field.type === 'formArray') {
            const formArray = <FormArray<any>>this.field;
            this.subFields = formArray.forms;

            // TODO: Add FormArrayConfig (Custom Templates :D)
        }
    }
}
