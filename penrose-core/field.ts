import { Validator } from './validator';
import { Form } from '.';

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

export interface ArrayFieldConfig<T> extends FieldConfig<T[]> {
    fieldsFactory: (o: T) => Field<T> | Form<T>;
}

export class ArrayField<T> extends Field<T[]> {
    constructor(config: ArrayFieldConfig<T>) {
        super(config);
    }
}
