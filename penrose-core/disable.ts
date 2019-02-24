import { Field } from "./field";
import { Form } from "./form";

import {forEach, pipe} from 'callbag-basics';

export interface ConditionalDisableConfig<T, U> {
    on: Form<T>,
    influences: Field<U>,
    when: any[], // TODO typing with valueChanges Stream type
    isDisabled: ((form: Form<T>) => boolean)[]
}

export function addConditionalDisable<T, U>(config: ConditionalDisableConfig<T, U>): void {
    const onValueChange = () => {
        config.influences.isDisabled = config.isDisabled.some(m => m(config.on));
    };

    // Register callback
    config.when.forEach((w) => pipe(w, forEach(onValueChange)));
}