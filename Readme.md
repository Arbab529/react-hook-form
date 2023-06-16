### React hook form helps in:

1. Managing form data
   - Every form has a few moving parts that keep changing from the time a user loads the form to the time they submit it.
     - Current value on every field in the form
     - Weather a field has been interacted with
     - Weather a field has been changed
     - Weather the form is invalid
     - Weather the field contains errors
2. Submitting form data
3. Enforce validations and provide visual feedback

### Install

```
yarn add react-hook-form
```

### How to use

Import the useForm hook into your form component

```
import {useForm} from 'react-hook-form'
```

Utilize useForm hook. This hook returns an object that contains several properties and methods that can be used with forms.

```
const form = useForm();
const { register } = form;
const { name, ref, onChange, onBlur } = register("username");
```

Input Control

```
<input type="text" id="username" name={name} ref={ref} onChange={onChange} onBlur={onBlur}/>
```

Or destructure the register on input control

```
const form = useForm();
const { register } = form;
```

```
<input type="text" id="username" {...register("username")}/>
```
