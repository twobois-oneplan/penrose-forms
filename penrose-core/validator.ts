import { Field, FormModel } from "./field";

export type ValidatorKey = string;
export type ValidatorMessage = string;
export type Validator<T extends Field<any>> = [ValidatorKey, ValidatorFn<T>, ValidatorMessage];
export type ValidatorFn<T extends Field<any>> = (field: T) => boolean;

// TODO: Null checks?
export const Required: Validator<Field<string>> = ['required', (field: Field<string>) => field.value === null || field.value.length === 0, 'Required error'];
export const MinLength = (minLength) => ['min', (field) => field.value.length < minLength, 'Min Length'];
export const MaxLength = (maxLength) => ['min', (field) => field.value.length < maxLength, 'Max Length'];
export const Min = (min): Validator<Field<number>> => ['Min', (field: Field<number>) => field.value < min, 'Minium ist ' + min];
export const Max = (max): Validator<Field<number>> => ['Max', (field: Field<number>) => field.value > max, 'Max ist ' + max];
export const MustBeTrue: Validator<Field<boolean>> = ['isTrue', (field: Field<boolean>) => field.value !== true, 'Must be true'];

export type GlobalValidatorFn<T extends FormModel<T>> = (form: T) => boolean;
export type GlobalValidator<T extends FormModel<T>> = [ValidatorKey, GlobalValidatorFn<T>, ValidatorMessage];