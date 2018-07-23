import { Validator } from './validator';

export interface FieldConfig<T extends PropertyType> {
	value?: T;
	label: string;
	validators?: Validator<Field<T>>[];
	helpText?: string;
}

interface Value<T> {
	get: () => T;
	set: (value: T) => void;
	changed: ((value: T) => void) | null;
}

// export type PropertyType<TArray = any> = string | boolean | number | object | TArray[];
export type PropertyType = string | boolean | number | object;

export interface Field<T extends PropertyType> {
	type: string; // TODO: necessary

	value: Value<T | null>;

	label: string;
	helpText: string | null;

	validators: Validator<Field<T>>[];
	validate: () => void;

	errors: Object;

	isTouched: boolean;
}

// TODO: fieldType als parameter oder in die config?
export function createField<T extends PropertyType>(type: string, config: FieldConfig<T>): Field<T> {
	// think of providing a withValue function, with encapsulates the value in a closure and does changed and validation handling
	let _value = config.value || null;

	const validate = () => field.errors = validateField(field);
	const setValue = (value: T) => {
		_value = value;
		validate();
		if (field.value.changed) field.value.changed(field.value.get());
	}

	const field: Field<T> = {
		type: type,
		value: {
			get: () => _value,
			set: setValue,
			changed: null
		},
		label: config.label,
		helpText: config.helpText || null,
		validators: config.validators || [],
		validate: validate,
		errors: {},
		isTouched: false
	};

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
	columns?: number;
	rows?: number;
}

export function createTextareaField(config: TextareaFieldConfig): TextareaField {
	return {
		...createField('textarea', config),
		columns: config.columns,
		rows: config.rows
	};
}

export interface NumberField extends Field<number> { }
export const createNumberField = (config: FieldConfig<number>): NumberField => createField('number', config);

export interface BoolField extends Field<boolean> { }
export const createBoolField = (config: FieldConfig<boolean>): BoolField => createField('bool', config);

export interface DropdownFieldConfig<T extends PropertyType, TOption> extends FieldConfig<T> {
	options: TOption[];
	optionLabel: (value: TOption) => string;
	optionValue: (value: TOption) => T;
}

export interface DropdownField<T extends PropertyType, TOption> extends Field<T> {
	options: TOption[];
	optionLabel: (value: TOption) => string;
	optionValue: (value: TOption) => T;
}

export const createDropdownField = <T extends PropertyType, TOption>(config: DropdownFieldConfig<T, TOption>): DropdownField<T, TOption> =>
	({
		...createField('dropdown', config),
		options: config.options,
		optionLabel: config.optionLabel,
		optionValue: config.optionValue
	});

export interface ArrayFieldConfig<T extends PropertyType> extends FieldConfig<T[]> {
	fieldsFactory: (o: T) => Field<T>;
}

export interface ArrayField<T extends PropertyType> extends Field<T[]> {
	fieldsFactory: (o: T) => Field<T>;
}

export const createArrayField = <T extends PropertyType>(config: ArrayFieldConfig<T>): ArrayField<T> =>
	({
		...createField('array', config), // i think createField cannot be used here, see Form for specialities
		fieldsFactory: config.fieldsFactory
	});
