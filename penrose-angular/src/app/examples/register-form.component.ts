import { Component } from "@angular/core";
import { setFormValues } from "../../../../penrose-core";
import { RegisterForm, createRegisterForm } from "../form-definitions";

@Component({
    selector: 'pen-order-form',
    template: `
        <div class="container mt-3 mb-5">
            <h2>Register Form</h2>
            <form novalidate>
                <pen-form-group [field]="registerForm"></pen-form-group>
            </form>
        </div>
    `
})
export class RegisterFormComponent {
    public registerForm: RegisterForm;

    constructor() {
        this.registerForm = createRegisterForm();
        setFormValues(this.registerForm, { email: 'pangeax@github.com', password: '', confirmPassword: '' });
    }
}
