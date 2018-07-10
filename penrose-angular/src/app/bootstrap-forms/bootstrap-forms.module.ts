import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
    BootstrapCheckboxComponent,
    BootstrapDropdownComponent,
    BootstrapNumberInputComponent,
    BootstrapPasswordInputComponent,
    BootstrapTextInputComponent,
    BootstrapTextareaComponent
} from './components';

const formInputs = [
    BootstrapCheckboxComponent,
    BootstrapDropdownComponent,
    BootstrapNumberInputComponent,
    BootstrapPasswordInputComponent,
    BootstrapTextInputComponent,
    BootstrapTextareaComponent
];

@NgModule({
    declarations: [...formInputs]
    entryComponents: [...formInputs],
    exports: [...formInputs],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class PenroseBootstrapFormsModule { }
