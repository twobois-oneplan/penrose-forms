import { Component, Input, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';
import { Field } from '../../../../../penrose-core';

import { FormInputComponent } from './form-input.component';
import { PenroseFormConfigService } from '../services';


@Component({
    selector: 'pen-form-input-anchor',
    template: ''
})
export class FormInputAnchorComponent<T> implements OnInit {
    @Input() field: Field<T>;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        public viewContainerRef: ViewContainerRef,
        private formConfigService: PenroseFormConfigService
    ) { }

    public ngOnInit() {
        const fieldConfig = this.formConfigService.config.mappings.find(m => m.take(this.field));

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(<any>fieldConfig.component);
        const componentRef = this.viewContainerRef.createComponent(componentFactory);
        (<FormInputComponent<any>>componentRef.instance).field = this.field;
    }
}
