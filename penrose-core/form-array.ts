import { Penrose } from './penrose';
import { Form, setFormValues, getFormValues } from './form';

export interface FormArray<T> extends Penrose {
    type: 'formArray';
    formArrayType: string;
    formFactory: () => Form<any>; // TODO: typing problems: T[] is not working!
    forms: Form<any>[]; // TODO: typing problems: T[] is not working!
}

export interface FormArrayConfig<T> {
    formFactory: () => Form<T>;
}

// TODO: formArrayType as parameter or in config obj?
export function createFormArray<T>(formArrayType: string, config: FormArrayConfig<T>): FormArray<T> {
    return {
        type: 'formArray',
        formArrayType: formArrayType,
        formFactory: config.formFactory,
        forms: []
    };
}

export function addForm<T>(formArray: FormArray<T>, value: Partial<T>) {
    const form = formArray.formFactory();
    setFormValues(form, value);
    formArray.forms.push(form);
}

export function getFormArrayValues<T>(formArray: FormArray<T>): Partial<T>[] {
    return formArray.forms.map(form => getFormValues(form));
}

export function setFormArrayValues<T>(formArray: FormArray<T>, values: Partial<T>[]) {
    formArray.forms = values.map(_ => formArray.formFactory());
    formArray.forms.forEach((form, i) => setFormValues(form, values[i]));
}