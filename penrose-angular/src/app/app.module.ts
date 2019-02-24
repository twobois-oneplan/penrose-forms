import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
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
import {
    PersonFormComponent, AddressFormComponent, OrderFormComponent,
    ProductOrderListComponent, ProductOrderFormComponent, RegisterFormComponent
} from './examples';

const customInputs = [
    PersonFormComponent,
    AddressFormComponent,
    OrderFormComponent,
    ProductOrderListComponent,
    ProductOrderFormComponent,
    RegisterFormComponent
];

const appRoutes: Routes = [
    { path: 'example/person',    component: PersonFormComponent },
    { path: 'example/order',     component: OrderFormComponent  },
    { path: 'example/register',  component: RegisterFormComponent  },
    { path: '',   redirectTo: '/example/person', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    ...customInputs
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
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


