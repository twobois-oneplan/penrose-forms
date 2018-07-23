import { Field, PropertyType } from './field';
import { Omit } from 'type-zoo';

export interface ValuesOnly {
	[key: string]: PropertyType;
}

export type FormFieldsConfig<T extends ValuesOnly> = {
	[K in keyof T]: Field<T[K]>;
}

export interface Form<T extends ValuesOnly, K extends keyof T = any> extends Field<Omit<T, K>> {
	formType: string;
	fields: FormFieldsConfig<Omit<T, K>>;
}

export interface FormConfig<T extends ValuesOnly> {
	formType: string;
	fields: FormFieldsConfig<T>;
}

export function createForm<T extends ValuesOnly, K extends keyof T = any>(config: FormConfig<T>): Form<T> {
	let isBatchChange = false;

	const validate = () => form.errors = {} // TODO: global validation
	const getValue = () => <any>Object.entries(config.fields).map(([key, field]) => ({ [key]: field.value.get() })); // TODO: typing problems, should return 
	const setValue = (value: any) => { // TODO: typing problems: value should be Omit<T, K>
		isBatchChange = true;
		Object.entries(value).forEach(([key, value]) => config.fields[key].value.set(value));
		isBatchChange = false;
		form.validate();
	};
	const handlePropertyChange = () => { if (!isBatchChange && form.value.changed) form.value.changed(form.value.get()); }
	Object.values(config.fields).forEach(field => field.value.changed = handlePropertyChange);

	const form: Form<T> = {
		type: 'form',
		formType: config.formType,
		fields: config.fields,
		label: "",
		value: {
			get: getValue,
			set: setValue,
			changed: null
		},
		helpText: "",
		validators: [],
		validate: validate,
		errors: {},
		isTouched: false
	};

	return form;
}

// set partial form values
