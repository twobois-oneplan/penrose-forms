import { Penrose } from './penrose';
import { Form } from './form';

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
