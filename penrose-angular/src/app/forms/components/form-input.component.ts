import { Field, Form } from '../../../../../penrose-core';

export interface FieldComponent<T extends Field<any>> {
    field: T;
}

export interface FormComponent<T extends Form<any>> {
    form: T;
}
