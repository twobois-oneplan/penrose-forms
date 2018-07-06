export type ValidatorKey = string;
export type ValidatorMessage = string;
export type Validator<T> = [ValidatorKey, ValidatorFn<T>, ValidatorMessage];
export type ValidatorFn<T> = (value: T) => boolean;

export const Required: Validator<string> = ['required', (value: string) => value.length === 0, 'Required error'];
export const MinLength = (minLength) => ['min', (value) => value.length < minLength, 'Min Length'];
export const MaxLength = (maxLength) => ['min', (value) => value.length < maxLength, 'Max Length'];
export const Min = (min): Validator<number> => ['Min', (value: number) => value < min, 'Minium ist ' + min];
export const Max = (max): Validator<number> => ['Max', (value: number) => value > max, 'Max ist ' + max];
export const MustBeTrue: Validator<boolean> = ['isTrue', (value: boolean) => value !== true, 'Must be true'];
