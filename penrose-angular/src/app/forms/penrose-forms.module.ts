import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { FormGroupComponent } from './components';
import { PenroseFormConfig, PenroseFormConfigService, PenroseFormConfigInjection } from './services/form-config.service';

@NgModule({
    declarations: [
        FormGroupComponent
    ],
    exports: [
        FormGroupComponent
    ],
    imports: [
        CommonModule
    ],
    entryComponents: [FormGroupComponent]
})
export class PenroseFormsModule {
    static forRoot(config: PenroseFormConfig): ModuleWithProviders {
        return {
            ngModule: PenroseFormsModule,
            providers: [
                PenroseFormConfigService,
                { provide: PenroseFormConfigInjection, useValue: config }
            ]
        };
    }
}
