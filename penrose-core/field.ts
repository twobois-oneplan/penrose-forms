import { Validator } from './validator';

export type FormModel<T extends { [key: string]: any }> = {
    [K in keyof T]?: Field<T[K]>;
};

const isDefined = value => value !== null && value !== undefined;

export function setValues<T>(form: FormModel<T>, values: Partial<T>) {
    // TODO: typing problems
    Object
        .entries(values)
        .map(value => ({ key: value[0], value: value[1] }))
        .filter(({key, value}) => isDefined(value) && isDefined(form[key]))
        .forEach(({key, value}) => {
            form[key].value = value;
        });
}

export function getValues<T>(form: FormModel<T>): Partial<T> {
    return Object
        .entries(form)
        .map(value => ({ key: value[0], field: value[1] }))
        .reduce((result, {key, field}) => {
            result[key] = (<Field<any>>field).value;
            return result;
        }, {});
}

export interface FieldConfig<T> {
    value?: T;
    label: string;
    validators?: Validator<Field<T>>[];
    helpText?: string;
}

export abstract class Field<T> {
    private _value: T;

    public label: string;
    public helpText: string;

    public validators: Validator<Field<T>>[];
    public errors: {};

    public _isTouched = false;

    constructor(config: FieldConfig<T>) {
        this._value = config.value || null; // TODO: null ok?

        this.label = config.label || null;
        this.helpText = config.helpText || null;

        this.validators = config.validators || [];
        this.validate();
    }

    set value(value: T) {
        this._value = value;
        this.validate();
    }

    get value() {
        return this._value;
    }

    get isTouched() {
        return this._isTouched;
    }

    private validate() {
        this.errors = {};
        this.validators.forEach(validator => {
            const isInvalid = validator[1](this);
            if (isInvalid) {
                this.errors[validator[0]] = validator[2];
            }
        });
    }

    public get errorMessages(): any[] {
        return Object.keys(this.errors)
            .map(m => ({ identifier: m, message: this.errors[m] }));
    }

    public get hasErrors(): boolean {
        return Object.keys(this.errors).length > 0;
    }

    public setTouched() {
        this._isTouched = true;
    }
}

// TODO ?
export class ArrayField<T extends FormModel<T>> extends Field<T[]> { }
