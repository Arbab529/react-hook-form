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

### Managing Form Data

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

### Use Devtools for React hook form

```
yarn add -D @hookform/devtools
```

import it in the form component where you want to use

```
import { DevTool } from "@hookform/devtools";
```

add the component after the enclosing `</form>` tag. To make it tracking the form you need to get the control object returned by useForm hook

```
const { register,control } = form;
```

```
<DevTool control={control}/>
```

### Form Submission

Destructure the handleSubmit method from form

```
const {handleSubmit } = form;
```

Create onSubmit function to handleSubmit

```
const onSubmit = (data) => {
    console.log("Form Submitted: ", data);
  };
```

use onSubmit on `<form>` tag

```
<form onSubmit={handleSubmit(onSubmit)}>
    ....
<form/>
```
