import { Observable } from 'rxjs';
import { Field } from './field';
import { Form } from './form';

export interface ConditionalHideConfig<T, U> {
    on: Form<T>,
    influences: Field<U> | Form<U>,
    when: Observable<any>[], // Must be any typed to support every possible Observable
    isHidden: ((form: Form<T>) => boolean)[]
}

export function addConditionalHide<T, U>(config: ConditionalHideConfig<T, U>): void {
    const onValueChange = () => {
        config.influences.isHidden = config.isHidden.some(m => m(config.on));
    };

    // Register callback
    config.when.forEach(w => w.subscribe(_ => onValueChange()));
}