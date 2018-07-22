import { Field, Form, FormArray } from '../../../../../penrose-core';

export interface FieldComponent<T extends Field<any>> {
    field: T;
}

export interface FormComponent<T extends Form<any>> {
    form: T;
}

export interface FormArrayComponent<T extends FormArray<any>> {
    formArray: T;
}
