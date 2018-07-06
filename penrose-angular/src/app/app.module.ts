import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormGroupComponent, BoolInputComponent, FormInputAnchorComponent, TextAreaInputComponent } from './forms';
import { FormComponent, TextInputComponent, NumberInputComponent, PasswordInputComponent, DropdownInputComponent } from './forms';

const formInputs = [
    TextInputComponent,
    TextAreaInputComponent,
    NumberInputComponent,
    BoolInputComponent,
    PasswordInputComponent,
    DropdownInputComponent
];

@NgModule({
  declarations: [
    AppComponent,
    FormGroupComponent,
    FormInputAnchorComponent,
    FormComponent,
    ...formInputs
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    // Dynamically injected
    ...formInputs
  ]
})
export class AppModule { }
