import { Field } from "./field";
import { Form } from "./form";

import {forEach, pipe} from 'callbag-basics';

export interface ConditionalHideConfig<T, U> {
    on: Form<T>,
    influences: Field<U> | Form<U>,
    when: any[], // TODO typing with valueChanges Stream type
    isHidden: ((form: Form<T>) => boolean)[]
}

export function addConditionalHide<T, U>(config: ConditionalHideConfig<T, U>): void {
    const onValueChange = () => {
        config.influences.isHidden = config.isHidden.some(m => m(config.on));
    };

    // Register callback
    config.when.forEach((w) => pipe(w, forEach(onValueChange)));
}