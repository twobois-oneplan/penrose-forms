import { InjectionToken, Inject, Injectable } from '@angular/core';
import { FieldComponent, FormComponent, FormArrayComponent } from '..';
import { Field, Form, FormArray } from '../../../../../penrose-core';

// TODO: is this needed?
export interface Type<T> extends Function {
    new (...args: any[]): T;
}

/* Field Mappings */
export interface FieldComponentMapping {
    field: string;
    component: Type<FieldComponent<Field<any>>>;
}

export function bindField<C extends FieldComponent<Field<any>>>(type: string, c: Type<C>): FieldComponentMapping {
    return { field: type, component: c };
}

/* Form Mappings */
export interface FormComponentMapping {
    form: string;
    component: Type<FormComponent<Form<any>>>;
}

export function bindForm<C extends FormComponent<Form<any>>>(t: string, c: Type<C>): FormComponentMapping {
    return { form: t, component: c };
}

/* Form Array Mappings */
export interface FormArrayComponentMapping {
    formArray: string;
    component: Type<FormArrayComponent<FormArray<any>>>;
}

export function bindFormArray<C extends FormArrayComponent<FormArray<any>>>(t: string, c: Type<C>): FormArrayComponentMapping {
    return { formArray: t, component: c };
}

/* Penrose Config */
export interface PenroseFormConfig {
    fieldMappings: FieldComponentMapping[];
    formMappings?: FormComponentMapping[];
    formArrayMappings?: FormArrayComponentMapping[];
}

export const PenroseFormConfigInjection = new InjectionToken<PenroseFormConfig>('PenroseFormConfig');

@Injectable()
export class PenroseFormConfigService {
    constructor(
        @Inject(PenroseFormConfigInjection) public config: PenroseFormConfig) {
    }
}
