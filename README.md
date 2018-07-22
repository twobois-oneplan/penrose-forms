<p align="center">
    <img src="logo.png" alt="logo" width="200">
</p>

# Penrose Forms
## Why
* Penrose Forms is making Form Development easier and makes forms reuseable by abstracting inputs
* Penrose is *typesafe*!
* Existing ways cannot be abstracted or are not dynamic enough
* Platform independent: the core is just TypeScript code

### Template Driven Forms
* 👎 Lots of HTML to write
* 👎 Incosistent, because people tend forget to set aria props or validation styles
* 👎 Custom Validators are way more complex than they have to be (Directives)
* 👎 Global Validators are not really possible
* 👎 Template Driven Inputs cannot be abstracted without passing many bindings
* 👎 Name attribute has to be set and nobody knows why
* 👎 Cannot be tested
    
### Reactive Forms
* ❤️ Validation is abstracted
* ❤️ Can be Unit Tested
* 👎 FormControlName has to be set
* 👎 Adding components dynamically is a pita
* 👎 Set Value / Get your model out requires a lot of mapping code

## Core
* `Field`
    * Wraps simple (int, string, ...) or complex data (TDto, ...) and fills it with extra infos (Label, Validators, Errors, ...)
    * **Must** be bound to a component

* `FormArray`
    * Wraps data lists of simple (**TODO: is this possible?**) or complex data
    * **Can** be bound to a custom FormArray Component (**TODO**)
    * If no binding specified it renders all form childs

* `Form`
    * Wraps multiple Fields, Forms (= Subforms) or FormArrays
    * **Can** be bound to a custom Form Component
    * If no binding specified it renders all Fields, Forms, FormArrays

## Angular
**!! One component to rule them all !!**

**TODO: naming of component is not final**
``` html
<pen-form-group [field]="form"></pen-form-group>
<pen-form-group [field]="field"></pen-form-group>
<pen-form-group [field]="fieldArray"></pen-form-group>
```
