import { Field } from '../../../../../penrose-core';

export interface FormInputComponent<T extends Field<any>> {
    field: T;
}

// TODO: add array component
// @Comment({
//     selector: 'pen-'
// })
