import { InjectionToken, Inject, Injectable } from '@angular/core';
import { FieldComponent, FormComponent } from '..';
import { Field, Form } from '../../../../../penrose-core';

export interface Type<T> extends Function {
    new (...args: any[]): T;
}

export interface FieldComponentMapping<T extends Field<any>> {
    field: Type<T>;
    component: Type<FieldComponent<T>>;
}

export function bindField<T extends Field<any>, C extends FieldComponent<T>>(t: Type<T>, c: Type<C>): FieldComponentMapping<T> {
    return (<FieldComponentMapping<T>>{ field: t, component: c });
}

export interface FormComponentMapping<T extends Form<any>> {
    form: Type<T>;
    component: Type<FormComponent<T>>;
}

export function bindForm<T extends Form<any>, C extends FormComponent<T>>(t: Type<T>, c: Type<C>): FormComponentMapping<T> {
    return (<FormComponentMapping<T>>{ form: t, component: c });
}

export interface PenroseFormConfig {
    fieldMappings: FieldComponentMapping<any>[];
    formMappings: FormComponentMapping<any>[];
}

export const PenroseFormConfigInjection = new InjectionToken<PenroseFormConfig>('PenroseFormConfig');

@Injectable()
export class PenroseFormConfigService {
    constructor(
        @Inject(PenroseFormConfigInjection) public config: PenroseFormConfig) {
    }
}
