import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PenroseFormsModule } from './forms/penrose-forms.module';
import {
    TextField, TextareaField, NumberField, PasswordField, DropdownField, BoolField
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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PenroseBootstrapFormsModule, // Import Penrose Bootstrap Forms
    PenroseFormsModule.forRoot({ // Import Penrose Forms
        mappings: [
            { take: f => f instanceof TextField, component: BootstrapTextInputComponent },
            { take: f => f instanceof TextareaField, component: BootstrapTextareaComponent },
            { take: f => f instanceof NumberField, component: BootstrapNumberInputComponent },
            { take: f => f instanceof BoolField, component: BootstrapCheckboxComponent },
            { take: f => f instanceof PasswordField, component: BootstrapPasswordInputComponent },
            { take: f => f instanceof DropdownField, component: BootstrapDropdownComponent }
        ]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


