import { Field } from "./field";
import { Form } from "./form";
import { Observable } from 'rxjs';

export interface ConditionalDisableConfig<T, U> {
    on: Form<T>,
    influences: Field<U>,
    when: Observable<any>[], // Must be any typed to support every possible Observable
    isDisabled: ((form: Form<T>) => boolean)[]
}

export function addConditionalDisable<T, U>(config: ConditionalDisableConfig<T, U>): void {
    const onValueChange = () => {
        config.influences.isDisabled = config.isDisabled.some(m => m(config.on));
    };

    // Register callback
    config.when.forEach(w => w.subscribe(_ => onValueChange()));
}