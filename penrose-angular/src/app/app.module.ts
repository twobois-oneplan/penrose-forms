import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PenroseFormsModule } from './forms/penrose-forms.module';
import {
    BootstrapCheckboxField, BootstrapCheckboxComponent,
    BootstrapTextareaField, BootstrapTextareaComponent,
    BootstrapTextField, BootstrapTextInputComponent,
    BootstrapNumberField, BootstrapNumberInputComponent,
    BootstrapPasswordField, BootstrapPasswordInputComponent,
    BootstrapDropdownField, BootstrapDropdownComponent
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
            { take: f => f instanceof BootstrapTextField, component: BootstrapTextInputComponent },
            { take: f => f instanceof BootstrapTextareaField, component: BootstrapTextareaComponent },
            { take: f => f instanceof BootstrapNumberField, component: BootstrapNumberInputComponent },
            { take: f => f instanceof BootstrapCheckboxField, component: BootstrapCheckboxComponent },
            { take: f => f instanceof BootstrapPasswordField, component: BootstrapPasswordInputComponent },
            { take: f => f instanceof BootstrapDropdownField, component: BootstrapDropdownComponent }
        ]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


