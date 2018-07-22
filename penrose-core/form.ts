import { Field } from './field';

export type FormConfig<T extends { [key: string]: any }> = {
    [K in keyof T]: Field<T[K]> | Form<T[K]>;
};

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export abstract class Form<T, K extends keyof T = undefined> {
    private _fields: FormConfig<Omit<T, K>>;

    constructor(fields: FormConfig<Omit<T, K>>) {
        this._fields = fields;
    }

    set fields(fields: FormConfig<Omit<T, K>>) {
        this._fields = fields;
    }

    get fields(): FormConfig<Omit<T, K>> {
        return this._fields;
    }
}

const isDefined = value => value !== null && value !== undefined;

export function setFormValues<T>(form: Form<T>, values: Partial<T>) {
    // TODO: typing problems
    Object
        .entries(values)
        .map(value => ({ key: value[0], value: value[1] }))
        .filter(({ key, value }) => isDefined(value) && isDefined(form.fields[key]))
        .forEach(({ key, value }) => {
            if (form.fields[key] instanceof Form) {
                setFormValues(form.fields[key], value);
            } else {
                (<Field<any>>form.fields[key]).value = value;
            }
        });
}

export function getFormValues<T>(form: Form<T>): Partial<T> {
    return Object
        .entries(form.fields)
        .map(value => ({ key: value[0], field: value[1] }))
        .reduce((result, { key, field }) => {
            result[key] = (<Field<any>>field).value;
            return result;
        }, {});
}
