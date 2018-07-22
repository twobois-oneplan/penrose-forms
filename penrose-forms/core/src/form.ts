import { Penrose } from './penrose';
import { Field } from './field';
import { FormArray } from './form-array';

export type FormFieldsConfig<T extends { [key: string]: any }> = {
    [K in keyof T]: Field<T[K]> | Form<T[K]> | FormArray<T[K]>;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export interface Form<T, K extends keyof T = undefined> extends Penrose {
    type: 'form';
    formType: string;
    fields: FormFieldsConfig<Omit<T, K>>;
}

export interface FormConfig<T> {
    formType: string;
    fields: FormFieldsConfig<T>;
}

export function createForm<T>(config: FormConfig<T>): Form<T> {
    return {
        type: 'form',
        formType: config.formType,
        fields: config.fields
    };
}

const isDefined = value => value !== null && value !== undefined;

export function setFormValues<T>(form: Form<T>, values: Partial<T>) {
    // TODO: typing problems
    Object
        .entries(values)
        .map(value => ({ key: value[0], value: value[1] }))
        .filter(({ key, value }) => isDefined(value) && isDefined(form.fields[key]))
        .forEach(({ key, value }) => {
            const type = form.fields[key].type;

            if (type === 'form') {
                setFormValues(form.fields[key], value);
            }

            if (type === 'field') {
                const field: Field<any> = form.fields[key];
                field.setValue(value);
            }

            if (type === 'formArray') {
                const formArray: FormArray<any> = form.fields[key];
                formArray.forms = (<any[]>value).map(m => formArray.formFactory());
                formArray.forms.forEach((f, i) => setFormValues(f, value[i]));
            }
        });
}

export function getFormValues<T>(form: Form<T>): Partial<T> {
    return Object
        .entries(form.fields)
        .map(value => ({ key: value[0], field: value[1] }))
        .reduce((result, { key, field }) => {
            result[key] = (<Field<any>>field).getValue();
            return result;
        }, {});
}
