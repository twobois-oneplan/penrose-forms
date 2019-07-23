import { Penrose } from './penrose';
import { Field, hasErrors } from './field';
import { FormArray } from './form-array';

export type ValuesOf<T extends any[]>= T[number];

export type FormFieldsConfig<T extends { [key: string]: any }> = {
    [K in keyof T]?: Field<T[K]> | Form<T[K]> | FormArray<ValuesOf<T[K]>>;
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

const isDefined = value => value !== null && value !== undefined; // TODO

// TODO: Object.entries(...) is used in the next 4 functions?!

export function validateForm<T>(form: Form<T>) {
    Object
        .entries(form.fields)
        .map(value => ({ key: value[0], value: value[1] as Penrose }))
        .filter(({ key, value }) => isDefined(value) && isDefined(form.fields[key]))
        .forEach(({ key, value }) => {
            if (value.type === 'form') {
                validateForm(value as Form<any>);
            }

            if (value.type === 'field') {
                const field = form.fields[key] as Field<any>;
                field.validate();
            }

            if (value.type === 'formArray') {
                const formArray = form.fields[key] as FormArray<any>;
                formArray.forms.forEach((form, i) => validateForm(form));
            }
        });
}

export function hasFormErrors<T>(form: Form<T>): boolean {
    return Object
        .entries(form.fields)
        .map(value => ({ key: value[0], value: value[1] as Penrose }))
        .filter(({ key, value }) => isDefined(value) && isDefined(form.fields[key]))
        .some(({ key, value }) => {
            if (value.type === 'form') {
                hasFormErrors(value as Form<any>);
            }

            if (value.type === 'field') {
                const field = form.fields[key] as Field<any>;
                if (hasErrors(field)) {
                    return true;
                }
            }

            if (value.type === 'formArray') {
                const formArray = form.fields[key] as FormArray<any>;
                formArray.forms.forEach((form, i) => hasFormErrors(form));
            }
        });
}

export function setFormTouched<T>(form: Form<T>) {
    return Object
        .entries(form.fields)
        .map(value => ({ key: value[0], value: value[1] as Penrose }))
        .filter(({ key, value }) => isDefined(value) && isDefined(form.fields[key]))
        .forEach(({ key, value }) => {
            if (value.type === 'form') {
                setFormTouched(value as Form<any>);
            }

            if (value.type === 'field') {
                const field = form.fields[key] as Field<any>;
                field.isTouched = true;
            }

            if (value.type === 'formArray') {
                const formArray = form.fields[key] as FormArray<any>;
                formArray.forms.forEach((form, i) => setFormTouched(form));
            }
        });
}

export function setFormValues<T>(form: Form<T>, values: Partial<T>): void {
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
                const field = form.fields[key] as Field<any>;
                field.setValue(value);
            }

            if (type === 'formArray') {
                const formArray = form.fields[key] as FormArray<any>;
                formArray.forms = (value as any[]).map(_ => formArray.formFactory());
                formArray.forms.forEach((form, i) => setFormValues(form, value[i]));
            }
        });
}

export function getFormValues<T>(form: Form<T>): Partial<T> {
    return Object
        .entries(form.fields)
        .map(value => ({ key: value[0], value: value[1] as Penrose }))
        .filter(({key, value}) => isDefined(value) && isDefined(form.fields[key]))
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
