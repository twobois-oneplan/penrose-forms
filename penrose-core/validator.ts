import { Penrose } from "./penrose";
import { Field } from "./field";
import { Form } from "./form";

import {forEach, pipe} from 'callbag-basics';

export interface Validator<T extends Penrose> {
    key: string;
    isValid: (field: T) => boolean;
    errorMessage: string;
}

// TODO: Null checks?
export const Required: Validator<Field<string>> = { key: 'required', isValid: (field: Field<string>) => field.getValue() !== null && field.getValue().length !== 0, errorMessage: 'FieldIsRequired' };
export const MinLength = (minLength: number) => ({ key: 'minLength', isValid: (field) => field.value.length >= minLength, errorMessage: 'Min Length' });
export const MaxLength = (maxLength: number) => ({ key: 'maxLength', isValid: (field) => field.value.length <= maxLength, errorMessage: 'Max Length' });
export const Min = (min: number): Validator<Field<number>> => ({ key: 'min', isValid: (field: Field<number>) => field.getValue() >= min, errorMessage: 'Minium is ' + min });
export const Max = (max: number): Validator<Field<number>> => ({ key: 'max', isValid: (field: Field<number>) => field.getValue() <= max, errorMessage: 'Max is ' + max });
export const MustBeTrue: Validator<Field<boolean>> = { key: 'mustBeTrue', isValid: (field: Field<boolean>) => field.getValue() === true, errorMessage: 'Must be true' };
export const MustBeFalse: Validator<Field<boolean>> = { key: 'mustBeFalse', isValid: (field: Field<boolean>) => field.getValue() === false, errorMessage: 'Must be false' };

export interface ConditionalValidatorConfig<T, U> {
    on: Form<T>,
    influences: Field<U>,
    when: any[], // TODO typing with valueChanges Stream type
    check: {
        condition: (form: Form<T>) => boolean,
        validators: Validator<Field<U>>[];
    }[]
}

export function addConditionalValidator<T, U>(config: ConditionalValidatorConfig<T, U>): void {
    const onValueChange = () => {
        let changedValidators = false;

        config.check.forEach(c => {
            if (c.condition(config.on)) {
                // Add validators
                c.validators.forEach(v => {
                    const hasValidator = config.influences.validators.some(va => va.key == v.key);
                    if (!hasValidator) {
                        config.influences.validators.push(v);
                        changedValidators = true;
                    }
                });
            } else {
                // Remove validators
                c.validators.forEach(v => {
                    const validator = config.influences.validators.find(va => va.key == v.key);
                    if (validator) {
                        config.influences.validators.splice(config.influences.validators.indexOf(validator), 1)
                        changedValidators = true;
                    }
                });
            }
        });

        if (changedValidators) {
            config.influences.validate();
        }
    }

    // Register callback
    config.when.forEach((w) => pipe(w, forEach(onValueChange)));
}

export interface GlobalValidatorConfig<T, U> {
    on: Form<T>,
    influences: Field<U>,
    when: any[], // TODO typing with valueChanges Stream type
    validators: Validator<Form<T>>[]
}

export function addGlobalValidator<T, U>(config: GlobalValidatorConfig<T, U>): void {
    const onValueChange = () => {
        config.validators.forEach(v => {
            const isInvalid = !v.isValid(config.on);
            if (isInvalid) {
                config.influences.errors[v.key] = v.errorMessage;
            }
        });
    }

    config.when.forEach((w) => pipe(w, forEach(onValueChange)));
}
