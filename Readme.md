## React hook form helps in:

1. Managing form data
   - Every form has a few moving parts that keep changing from the time a user loads the form to the time they submit it.
     - Current value on every field in the form
     - Weather a field has been interacted with
     - Weather a field has been changed
     - Weather the form is invalid
     - Weather the field contains errors
2. Submitting form data
3. Enforce validations and provide visual feedback

## Install

```
yarn add react-hook-form
```

## Managing Form Data

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

## Use Devtools for React hook form

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

## Form Submission

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

## Form Validation

Add `noValidate` to the form tag.

```
<form onSubmit={handleSubmit(onSubmit)} noValidate>
    ....
<form/>
```

Validate the form field by passing an object as second argument to the register function

> Example: Validate Text Field

```
<input
  type="text"
  id="username"
  {...register("username", {
      required: {
        value: true,
        message: "Username is required",
      }
  })}
/>
```

> Example: Validate Email Field

```
<input
  type="email"
  id="email"
  {...register("email", {
    pattern: {
      value:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: "Incorrect Email Format",
    },
    required: {
      value: true,
      message: "Email is required",
    },
  })}
/>
```

## Display Error Message

Destructure `formState` from `form` Object and `errors` from `formState`.

```
const { formState } = form;
const { errors } = formState;
```

Now in order to show this error. You need to use the `errors` property.

```
<div className="form-control">
  <input
    type="text"
    id="username"
    {...register("username", {
        required: {
          value: true,
          message: "Username is required",
        }
    })}
  />
  <p>{errors.username?.message}</p>
</div>
```

## Custom Validation

In order to use custom validations. You have to use `validate` object and then you can pass on the key value pairs to that.

> Example: Check If user has entered domain.com then it will show an error message that `This domain is blacklisted`

`key:` blackListDomain

`value:` function that contains the input value

```
<div className="form-control">
    <input
        type="text"
        id="domain"
        {...register("domain", {
            required: {
            value: true,
            message: "Domain is required",
            },
            validate: {
            blackListDomain: (value) => {
                return value !== "domain.com" || "This domain is blacklisted";
            },
            },
        })}
    />
    <p className="error">{errors.domain?.message}</p>
</div>
```

## Default Values

In order to pass default values to your form you can use `defaultValues` as an object in `useForm` hook.

```
const form = useForm({
  defaultValues: {
    username: "",
    email: "",
    channel: "",
    domain: "",
  },
});
```

In order to get data from `API` you can use `defaultValues` as a `function`

```
const form = useForm({
  defaultValues: async () => {
    const response = await fetch(
    "https://jsonplaceholder.typicode.com/users/1"
    );
    const data = await response.json();
    return {
    username: "",
    email: data?.email,
    channel: "",
    domain: "",
    };
  },
});
```

## Nested Objects

Define the default state in `useForm` hook

```
const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      social: {
        facebook: "",
        twitter: "",
      },
    },
  });
```

In order to use the nested value you need to use `dot(.) notation` in register.

```
 <input
    type="text"
    id="facebook"
    {...register("social.facebook")}
/>
```

```
<input
    type="text"
    id="social.twitter"
    {...register("social.twitter")}
/>
```

## Array Data

Define the default state in `useForm` hook

```
const form = useForm({
    defaultValues: {
      social: {
        facebook: "",
        twitter: "",
      },
      phoneNumbers:["",""]
    },
  });
```

In order to use the array value you need to use `dot(.) notation` in register because `react-hook-form` doesn't support bracket `[0]` syntax in JSX.

```
<input
  type="text"
  id="primary-phone"
  {...register("phoneNumbers.0")}
/>
```

```
<input
  type="text"
  id="secondary-phone"
  {...register("phoneNumbers.1")}
/>
```

## Dynamic Fields

In order to create dynamic fields `react-hook-form` provides a hook called `useFieldArray`

First import the hook

```
import { useFieldArray } from "react-hook-form";
```

destructure the `field` `append` `remove` from `useFieldArray` and pass the `name`and `control` as object to the hook.

```
const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
});
```

> Example: Make dynamic phone numbers field.

```
  <div>
    <label>List of Phone Numbers</label>
    <div>
      {fields.map((field, index) => (
        <div className="form-control" key={field.id}>

          <input
            type="text"
            id="phNumbers"
            {...register(`phNumbers.${index}.number`)}
          />

          {index > 0 && (
            <button type="button" onClick={() => remove(index)}>-</button>
          )}

        </div>
      ))}
      <button type="button" onClick={() => append({ number: "" })}>+</button>
    </div>
  </div>
```

## Number and Date type data

In order to use `number` and `date` type data in field, `register` method provides the following properties:

- `valueAsNumber`
- `valueAsDate`

> Example: Number field

```
<input type="text" id="age"
  {...register("age", {
    valueAsNumber: true,
    required: {
      value: true,
      message: "Age is required",
    },
  })}
/>
```

> Example: Date field

```
<input type="date" id="dob"
  {...register("dob", {
    valueAsDate: true,
    required: {
      value: true,
      message: "Dob is required",
    },
  })}
/>
```

## Realtime data rendering on DOM

In order to use see the realtime data rendering on dom `useForm` hook provide a `watch` method.

```
const form = useForm();

const {watch} = form;

const watchData = watch(); // will return whole data
```

OR

```
const watchData = watch("username"); // will return username only
```

OR

```
const watchData = watch(["username","email"]); // will return username and email only

```

This `watchData` variable will hold the full data of the form which you can use to render realtime on DOM.

## Avoid component rerendering on watch

You can avoid component rerendering on watch by using the `callback` function. The example below will watch and log the input changes but it will not re render the component.

```
useEffect(() => {
  const subscription = watch((val) => {
    console.log(val);
  });
  return () => subscription.unsubscribe();
}, [watch]);
```

## Get Values

An optimized helper for reading form values. The difference between `watch` and `getValues` is that getValues will not trigger re-renders or subscribe to input changes.

```
const { getValues } = form;
```

You can get the specific values also by passing the required field as an argument to the getValues. `getValues("name")` or `getValues(["name","age"])`

```
const handleGetValues = () => {
  console.log("Get Values", getValues());
};
```

Create a button that will trigger this method.

```
<button type="button" onClick={handleGetValues}>Get Values</button>
```
