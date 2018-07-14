import { Field, FormModel } from "./field";

export interface Validator<T extends Field<any>> {
    key: string;
    isValid: (field: T) => boolean;
    errorMessage: string;
}

// TODO: Null checks?
export const Required: Validator<Field<string>> = { key: 'required', isValid: (field: Field<string>) => field.value !== null && field.value.length !== 0, errorMessage: 'FieldIsRequired' };
export const MinLength = (minLength: number) => ({ key: 'minLength', isValid: (field) => field.value.length >= minLength, errorMessage: 'Min Length' });
export const MaxLength = (maxLength: number) => ({ key: 'maxLength', isValid: (field) => field.value.length <= maxLength, errorMessage: 'Max Length' });
export const Min = (min: number): Validator<Field<number>> => ({ key: 'min', isValid: (field: Field<number>) => field.value >= min, errorMessage: 'Minium is ' + min });
export const Max = (max: number): Validator<Field<number>> => ({ key: 'max', isValid: (field: Field<number>) => field.value <= max, errorMessage: 'Max is ' + max });
export const MustBeTrue: Validator<Field<boolean>> = { key: 'mustBeTrue', isValid: (field: Field<boolean>) => field.value === true, errorMessage: 'Must be true' };
export const MustBeFalse: Validator<Field<boolean>> = { key: 'mustBeFalse', isValid: (field: Field<boolean>) => field.value === false, errorMessage: 'Must be false' };

export interface GlobalValidator<T extends FormModel<T>> {
    key: string;
    isValid: (form: T) => boolean;
    errorMessage: string;
}