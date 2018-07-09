import { Validator } from './validator';

export interface FieldConfig<T> {
    value: T;
    label: string;
    validators?: Validator<T>[];
    helpText?: string;
}

export class Field<T> {
    private _value: T;

    public label: string;
    public helpText: string;

    public validators: Validator<T>[];
    public errors: {};

    public _isTouched = false;

    constructor(config: FieldConfig<T>) {
        this._value = config.value;

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
            const isInvalid = validator[1](this.value);
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
export class TextField extends Field<string> { }

export interface TextAreaFieldConfig extends FieldConfig<string> {
    columns?: number;
}

export class TextAreaField extends Field<string> {
    public columns: number;

    constructor(config: TextAreaFieldConfig) {
        super(config);

        this.columns = config.columns || 3;
    }
}

export class NumberField extends Field<number> { }
export class BoolField extends Field<boolean> { }
export class PasswordField extends Field<string> { }

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
