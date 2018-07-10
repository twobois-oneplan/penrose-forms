import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { FormComponent, FormGroupComponent, FormInputAnchorComponent } from './components';
import { PenroseFormConfig, PenroseFormConfigService, PenroseFormConfigInjection } from './services/form-config.service';

@NgModule({
    declarations: [
        FormComponent,
        FormGroupComponent,
        FormInputAnchorComponent
    ],
    exports: [
        FormComponent,
        FormGroupComponent
    ],
    imports: [
        CommonModule
    ]
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