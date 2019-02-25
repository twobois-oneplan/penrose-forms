<p align="center">
    <img src="logo.png" alt="logo" width="100">
</p>

# Penrose Forms
Currently only **Angular** is supported!

## Why Penrose?
* Penrose Forms is making Form Development easier and makes forms reuseable by abstracting inputs
* Penrose is *typesafe*!
* Existing ways cannot be abstracted or are not dynamic enough
* Platform independent: the core is just TypeScript code

### Why not use 'Template Driven Forms'?
* 👎 Lots of HTML to write
* 👎 Incosistent, because people tend forget to set aria props or validation styles
* 👎 Custom Validators are way more complex than they have to be (Directives)
* 👎 Global / Conditional Validators are not really possible
* 👎 Template Driven Inputs cannot be abstracted without passing many bindings
* 👎 Name attribute has to be set and nobody knows why
* 👎 Cannot be tested

### Why not use 'Reactive Forms'?
* ❤️ Validation is abstracted
* ❤️ Can be Unit Tested
* 👎 FormControlName has to be set
* 👎 Adding components dynamically is a pita
* 👎 Set Value / Get your model out requires a lot of mapping code

## Core
Penrose is splitted in 3 different parts:
* `Field`
    * Represents your data input (text input, number input, select/option dropdown, ...)
    * Wraps simple (int, string, ...) or complex data (DTOs, ...) and fills it with extra infos (Label, Validators, Errors, ...)
    * **Must** be bound to a (input) component

* `FormArray`
    * Wraps data lists of simple (**TODO: is this possible?**) or complex data
    * **Can** be bound to a custom FormArray Component
    * If no binding specified it renders all form childs in a list

* `Form`
    * Wraps multiple Fields, Forms (= Subforms) or FormArrays
    * **Can** be bound to a custom Form Component
    * If no binding specified it renders all Fields, Forms, FormArrays in a list

> One component to rule them all

**TODO: naming of component is not final**
``` html
<pen-form-group [field]="form"></pen-form-group>
<pen-form-group [field]="field"></pen-form-group>
<pen-form-group [field]="fieldArray"></pen-form-group>
```

## Getting Started
So you want to build a register form for your great website:

1. Maybe you have your simple data typed as following:
    ``` ts
    export interface RegisterDto {
        email: string;
        password: string;
        confirmPassword: string;
    }
    ```

2. Install Penrose **TODO**
3. Register Penrose in your `app.module.ts`:
    ``` ts
    imports: [
        PenroseBootstrapFormsModule, // Import Penrose Bootstrap Forms
        PenroseFormsModule.forRoot({ // Import Penrose Forms
            fieldMappings: [
                bindField('text', BootstrapTextInputComponent),
                bindField('password', BootstrapPasswordInputComponent),
            ]
        })
    ]
    ```

3. Define your form:
    ``` js
        const form: RegisterForm = createForm<RegisterDto>({
            formType: 'register',
            fields: {
                email: createTextField({ label: 'Email', validators: [Required] }),
                password: createPasswordField({ label: 'Password '}),
                confirmPassword: createPasswordField({ label: 'Confirm Password' })
            }
        });
    ```

4. Display your form:
    ``` html
    <pen-form-group [field]="form"></pen-form-group>
    ```

## More information
* [More examples]() **TODO**
* [How to do Validation](/wiki/Validation)
