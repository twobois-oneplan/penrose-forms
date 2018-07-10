import { InjectionToken, Inject, Injectable } from '@angular/core';

// TODO: typing
interface FieldComponentMapping<T> {
    take: (f: any) => boolean;
    component: any;
}

export interface PenroseFormConfig {
    mappings: FieldComponentMapping<any>[];
}

export const PenroseFormConfigInjection = new InjectionToken<PenroseFormConfig>('PenroseFormConfig');

@Injectable()
export class PenroseFormConfigService {
    constructor(
        @Inject(PenroseFormConfigInjection) public config: PenroseFormConfig) {
    }
}
