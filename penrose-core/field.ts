import { Validator } from './validator';
import { Penrose } from './penrose';
import { forEach, pipe } from 'callbag-basics';
import makeSubject from 'callbag-subject';


export interface FieldConfig<T> {
    value?: T;
    id?: string;
    label: string;
    validators?: Validator<Field<T>>[];
    helpText?: string;
    isDisabled?: boolean;
    isHidden?: boolean;
}

export interface Field<T> extends Penrose {
    type: 'field';
    fieldType: string; // TODO: is des leiwaund?

    getValue: () => T;
    setValue: (value: T) => void;

    id: string | null;
    label: string | null;
    helpText: string | null;

    validators: Validator<Field<T>>[];
    validate: () => void;

    errors: Object;

    valueChange: any; // TODO: add typing
    isTouched: boolean;
    isDisabled: boolean;
    isHidden: boolean;
}

// TODO: Naming?
export function handleValidation<T>(field: Field<T>, value: T | null) {
    const subject = makeSubject();
    field.valueChange = subject;

    let _value = value || null; // TODO: null ok?

    field.validate = () => field.errors = validateField(field);
    field.getValue = () => _value;
    field.setValue = (value: T) => {
        _value = value;
        field.validate();
        subject(1, value);
    };
}

// TODO: fieldType als parameter oder in die config?
export function createField<T>(fieldType: string, config: FieldConfig<T>): Field<T> {
    const field: Field<T> = {
        type: 'field',
        fieldType: fieldType,

        getValue: null,
        setValue: null,

        id: config.id || null,
        label: config.label || null,
        helpText: config.helpText || null,

        validators: config.validators || [],
        validate: null,

        errors: {},

        valueChange: null,
        isTouched: false,
        isDisabled: config.isDisabled || false,
        isHidden: config.isHidden || false,
    };

    handleValidation(field, config.value);

    return field;
}

export function hasErrors(field: Field<any>): boolean {
    return Object.keys(field.errors).length > 0;
}

export function getErrorMessages(field: Field<any>) {
    return Object.keys(field.errors)
            .map(m => ({ identifier: m, message: field.errors[m] }));
}

export function validateField(field: Field<any>): Object {
    let errors = {};
    field.validators.forEach(v => {
        const isInvalid = !v.isValid(field);
        if (isInvalid) {
            errors[v.key] = v.errorMessage;
        }
    });

    return errors;
}

export interface TextField extends Field<string> { }
export const createTextField = (config: FieldConfig<string>): TextField => createField('text', config);

export interface PasswordField extends Field<string> { }
export const createPasswordField = (config: FieldConfig<string>): PasswordField => createField('password', config);

export interface TextareaFieldConfig extends FieldConfig<string> {
    columns?: number;
    rows?: number;
}

export interface TextareaField extends Field<string> {
    columns: number;
    rows: number;
}

export function createTextareaField(config: TextareaFieldConfig): TextareaField {
    const field: TextareaField = {
        ...createField('textarea', config),
        columns: config.columns,
        rows: config.rows
    };

    handleValidation(field, config.value);

    return field;
}

export interface NumberField extends Field<number> { }
export const createNumberField = (config: FieldConfig<number>): NumberField => createField('number', config);

export interface BoolField extends Field<boolean> { }
export const createBoolField = (config: FieldConfig<boolean>): BoolField => createField('bool', config);

export interface DropdownFieldConfig<T, TOption> extends FieldConfig<T> {
    options: TOption[];
    optionLabel: (value: TOption) => string;
    optionValue: (value: TOption) => T;
}

export interface DropdownField<T, TOption> extends Field<T> {
    options: TOption[];
    optionLabel: (value: TOption) => string;
    optionValue: (value: TOption) => T;
}

export function createDropdownField<T, TOption>(config: DropdownFieldConfig<T, TOption>): DropdownField<T, TOption> {
    const field: DropdownField<T, TOption> = {
        ...createField('dropdown', config),
        options: config.options,
        optionLabel: config.optionLabel,
        optionValue: config.optionValue
    };

    handleValidation(field, config.value);

    return field;
}
