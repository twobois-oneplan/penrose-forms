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
        .filter(({ key, value }) => isDefined(value) && isDefined(form[key]))
        .forEach(({ key, value }) => {
            form[key].value = value;
        });
}

export function getValues<T>(form: FormModel<T>): Partial<T> {
    return Object
        .entries(form)
        .map(value => <{ key: string, field: Field<T> }>({ key: value[0], field: value[1] }))
        .reduce((result, { key, field }) => ({ ...result, [key]: field }), {});
}

export interface FieldConfig<T> {
    value?: T;
    label: string;
    validators?: Validator<Field<T>>[];
    helpText?: string;
}

export abstract class Field<T> {
    private _value: T; // | FormModel<T>;

    public label: string;
    public helpText: string;

    public validators: Validator<Field<T>>[];
    public errors: {};

    public _isTouched = false;

    public valueChanged: () => void = null;

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

        if (this.valueChanged !== null) {
            this.valueChanged();
        }
        
    }

    get value(): T {
        return this._value;
    }

    get isTouched() {
        return this._isTouched;
    }

    private validate() {
        this.errors = {};
        this.validators.forEach(v => {
            const isInvalid = !v.isValid(this);
            if (isInvalid) {
                this.errors[v.key] = v.errorMessage;
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

export class TextField extends Field<string> { }
export class PasswordField extends Field<string> { }

export interface TextareaFieldConfig extends FieldConfig<string> {
    columns?: number;
    rows?: number;
}

export class TextareaField extends Field<string> {
    public columns: number;
    public rows: number;

    constructor(config: TextareaFieldConfig) {
        super(config);

        this.columns = config.columns;
        this.rows = config.rows;
    }
}

export class NumberField extends Field<number> { }

export class BoolField extends Field<boolean> { }

export interface DropdownFieldConfig<T, TOption> extends FieldConfig<T> {
    options: TOption[];
    optionLabel: (value: TOption) => string;
    optionValue: (value: TOption) => T;
}

export class DropdownField<T, TOption> extends Field<T> {
    public options: TOption[];
    public optionLabel: (value: TOption) => string;
    public optionValue: (value: TOption) => T;

    constructor(config: DropdownFieldConfig<T, TOption>) {
        super(config);

        this.options = config.options;
        this.optionLabel = config.optionLabel;
        this.optionValue = config.optionValue;
    }
}
