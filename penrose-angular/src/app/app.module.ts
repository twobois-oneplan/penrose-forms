import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent, AddressFormComponent, ProductOrderListComponent, ProductOrderFormComponent } from './app.component';
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
import { bindFormArray, bindForm, bindField } from './forms';
import { PenroseFormsModule } from './forms/penrose-forms.module';
import { PenroseBootstrapFormsModule } from './bootstrap-forms/bootstrap-forms.module';
import { AddressFormType } from './form-definitions';

const customInputs = [
    AddressFormComponent,
    ProductOrderListComponent,
    ProductOrderFormComponent
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
            bindField('text', BootstrapTextInputComponent), // TODO: strings as consts?
            bindField('textarea', BootstrapTextareaComponent),
            bindField('number', BootstrapNumberInputComponent),
            bindField('bool', BootstrapCheckboxComponent),
            bindField('password', BootstrapPasswordInputComponent),
            bindField('dropdown', BootstrapDropdownComponent),
        ],
        formMappings: [
            bindForm(AddressFormType, AddressFormComponent),
            bindForm('productOrder', ProductOrderFormComponent)
        ],
        // TODO: create example for FormArrays
        formArrayMappings: [
            bindFormArray('productOrderList', ProductOrderListComponent)
        ]
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [...customInputs]
})
export class AppModule { }


