import { Penrose } from './penrose';
import { Field } from './field';
import { FormArray } from './form-array';

export type FormFieldsConfig<T extends { [key: string]: any }> = {
    [K in keyof T]?: Field<T[K]> | Form<T[K]> | FormArray<T[K]>;
};

export interface Form<T> extends Penrose {
    type: 'form';
    formType: string;
    fields: FormFieldsConfig<T>;
    isHidden: boolean;
}

export interface FormConfig<T> {
    formType: string;
    fields: FormFieldsConfig<T>;
    isHidden?: boolean;
}

export function createForm<T>(config: FormConfig<T>): Form<T> {
    return {
        type: 'form',
        formType: config.formType,
        fields: config.fields,
        isHidden: config.isHidden || false
    };
}

const isDefined = value => value !== null && value !== undefined;

export function setFormValues<T>(form: Form<T>, values: Partial<T>) {
    // TODO: typing problems
    Object
        .entries(values)
        .map(value => ({ key: value[0], value: value[1] }))
        .filter(({key, value}) => isDefined(value) && isDefined(form.fields[key]))
        .forEach(({key, value}) => {
            const type = form.fields[key].type;

            if (type === 'form') {
                setFormValues(form.fields[key], value);
            }

            if (type === 'field') {
                const field = form.fields[key] as Field<any>;
                field.setValue(value);
            }

            if (type === 'formArray') {
                const formArray = form.fields[key] as FormArray<any>;
                formArray.forms = (<any[]>value).map(m => formArray.formFactory());
                formArray.forms.forEach((form, i) => setFormValues(form, value[i]));
            }
        });
}

export function getFormValues<T>(form: Form<T>): Partial<T> {
    return Object
        .entries(form.fields)
        .map(value => ({ key: value[0], value: value[1] as Penrose }))
        .reduce((result, { key, value }) => {
            if (value.type === 'form') {
                const form = value as Form<any>;
                result[key] = getFormValues(form);
            }

            if (value.type === 'field') {
                const field = value as Field<any>;
                result[key] = field.getValue();
            }

            if (value.type === 'formArray') {
                const formArray = value as FormArray<any>;
                result[key] = formArray.forms.map(form => getFormValues(form));
            }

            return result;
        }, {});
}
