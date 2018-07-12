import { Component, Input, ComponentFactoryResolver, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Field } from '../../../../../penrose-core';

import { FormInputComponent } from './form-input.component';
import { PenroseFormConfigService } from '../services';

@Component({
    selector: 'pen-form-group',
    template: `<template #fieldControl></template>`
})
export class FormGroupComponent<T> implements OnInit {
    @Input() field: Field<T>;

    @ViewChild('fieldControl', {read: ViewContainerRef})
    targetRef: ViewContainerRef;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private formConfigService: PenroseFormConfigService
    ) { }

    public ngOnInit() {
        const fieldConfig = this.formConfigService.config.mappings.find(m => m.take(this.field));

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(<any>fieldConfig.component);
        const componentRef = this.targetRef.createComponent(componentFactory);
        (<FormInputComponent<any>>componentRef.instance).field = this.field;
    }
}

// TODO: ErrorFeedback rausziehen!
