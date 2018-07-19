import { InjectionToken, Inject, Injectable } from '@angular/core';
import { FieldComponent, FormComponent } from '..';
import { Field, Form } from '../../../../../penrose-core';

export interface Type<T> extends Function {
    new (...args: any[]): T;
}

export interface FieldComponentMapping {
    field: string;
    component: Type<FieldComponent<Field<any>>>;
}

export function bindField<C extends FieldComponent<Field<any>>>(type: string, c: Type<C>) {
    return { field: type, component: c };
}

export interface FormComponentMapping {
    form: string;
    component: Type<FormComponent<Form<any>>>;
}

export function bindForm<C extends FormComponent<Form<any>>>(t: string, c: Type<C>) {
    return { form: t, component: c };
}

export interface PenroseFormConfig {
    fieldMappings: FieldComponentMapping[];
    formMappings: FormComponentMapping[];
}

export const PenroseFormConfigInjection = new InjectionToken<PenroseFormConfig>('PenroseFormConfig');

@Injectable()
export class PenroseFormConfigService {
    constructor(
        @Inject(PenroseFormConfigInjection) public config: PenroseFormConfig) {
    }
}
