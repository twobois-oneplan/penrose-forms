import { Penrose } from './penrose';
import { Form } from './form';

export interface FormArray<T> extends Penrose {
    type: 'formArray';
    formFactory: () => Form<any>; // TODO: typing problems: T[] is not working!
    forms: Form<any>[]; // TODO: typing problems: T[] is not working!
}

export interface FormArrayConfig<T> {
    formFactory: () => Form<T>;
}

export function createFormArray<T>(config: FormArrayConfig<T>): FormArray<T> {
    return {
        type: 'formArray',
        formFactory: config.formFactory,
        forms: []
    };
}
