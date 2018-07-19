import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent, AddressFormComponent, AddressField, AddressForm } from './app.component';
import { PenroseFormsModule } from './forms/penrose-forms.module';
import {
    TextField, TextareaField, NumberField, PasswordField, DropdownField, BoolField, Field
} from '../../../penrose-core/field';
import {
    BootstrapCheckboxComponent,
    BootstrapTextareaComponent,
    BootstrapTextInputComponent,
    BootstrapNumberInputComponent,
    BootstrapPasswordInputComponent,
    BootstrapDropdownComponent
} from './bootstrap-forms/components';
import { PenroseBootstrapFormsModule } from './bootstrap-forms/bootstrap-forms.module';
import { bindField, bindForm } from './forms';

const customInputs = [
    AddressFormComponent
];

@NgModule({
  declarations: [
    AppComponent,
    ...customInputs
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PenroseBootstrapFormsModule, // Import Penrose Bootstrap Forms
    PenroseFormsModule.forRoot({ // Import Penrose Forms
        fieldMappings: [
            bindField(TextField, BootstrapTextInputComponent),
            bindField(TextareaField, BootstrapTextareaComponent),
            bindField(NumberField, BootstrapNumberInputComponent),
            bindField(BoolField, BootstrapCheckboxComponent),
            bindField(PasswordField, BootstrapPasswordInputComponent),
            bindField(DropdownField, BootstrapDropdownComponent),
        ],
        formMappings: [
            bindForm(AddressForm, AddressFormComponent)
        ]
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [...customInputs]
})
export class AppModule { }


