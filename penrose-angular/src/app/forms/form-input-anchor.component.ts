import { Component, Input, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';
import { Field, NumberField, TextField, BoolField, PasswordField, DropdownField, TextAreaField } from '../../../../penrose-core';
import {
    NumberInputComponent, TextInputComponent, FormInputComponent,
    BoolInputComponent, PasswordInputComponent, DropdownInputComponent, TextAreaInputComponent
} from './form-input.component';

@Component({
    selector: 'app-form-input-anchor',
    template: ''
})
export class FormInputAnchorComponent<T> implements OnInit {
    @Input() field: Field<T>;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        public viewContainerRef: ViewContainerRef
    ) { }

    public ngOnInit() {
        // const config: { take: (field: Field<T>) => boolean, component: FormInputComponent<any> }[] = [
        const config: any[] = [
            { take: f => f instanceof TextField, component: TextInputComponent },
            { take: f => f instanceof TextAreaField, component: TextAreaInputComponent },
            { take: f => f instanceof NumberField, component: NumberInputComponent },
            { take: f => f instanceof BoolField, component: BoolInputComponent },
            { take: f => f instanceof PasswordField, component: PasswordInputComponent },
            { take: f => f instanceof DropdownField, component: DropdownInputComponent }
        ];

        const fieldConfig = config.find(m => m.take(this.field));

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(<any>fieldConfig.component);
        const componentRef = this.viewContainerRef.createComponent(componentFactory);
        (<FormInputComponent<any>>componentRef.instance).field = this.field;
    }
}
