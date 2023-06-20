import {} from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type formValues = {
  username: string;
  email: string;
  channel: string;
  domain: string;
  social: {
    facebook: string;
    twitter: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date;
};

const EnhancedFormCopy = () => {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      domain: "",
      social: {
        facebook: "",
        twitter: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [
        {
          number: "",
        },
      ],
      age: 0,
      dob: new Date(),
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  // const { name, ref, onChange, onBlur } = register("username");

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  const onSubmit = (data: formValues) => {
    console.log("Form Submitted: ", data);
  };
  return (
    <div>
      <h1>Enhanced Form</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "Username is required",
              },
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div> */}

        {/* <input
          type="text"
          id="username"
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
        /> */}

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
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
              validate: {
                notAdmin: (value) => {
                  return (
                    value !== "admin@gmail.com" ||
                    "Email not supported. Please use any other email"
                  );
                },
                notBlackListed: (value) => {
                  return (
                    !value.endsWith("domain.com") ||
                    `Accounts with (domain.com) are not allowed`
                  );
                },
                checkAdmin: (value) => {
                  return (
                    !value.startsWith("admin") ||
                    "Email should be other then admin"
                  );
                },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        {/* <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          {...register("channel", {
            required: {
              value: true,
              message: "Channel is required",
            },
          })}
        />
        <p className="error">{errors.channel?.message}</p>

        <label htmlFor="domain">Domain</label>
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
        <p className="error">{errors.domain?.message}</p> */}

        <div className="form-control">
          <label htmlFor="social.facebook">Facebook</label>
          <input
            type="text"
            id="social.facebook"
            {...register("social.facebook")}
          />
          <p className="error"></p>
        </div>

        {/* <div className="form-control">
          <label htmlFor="social.twitter">Twitter</label>
          <input
            type="text"
            id="social.twitter"
            {...register("social.twitter")}
          />
          <p className="error"></p>
        </div> */}

        {/* <div className="form-control">
          <label htmlFor="primary-phone">Primary Phone Number</label>
          <input
            type="tel"
            id="primary-phone"
            {...register("phoneNumbers.0", {
              required: {
                value: true,
                message: "Phone number must be entered",
              },
            })}
          />
          <p className="error">{errors.phoneNumbers[0]?.message}</p>
        </div> */}

        {/* <div className="form-control">
          <label htmlFor="second-phone">Secondary Phone Number</label>
          <input type="tel" id="second-phone" {...register("phoneNumbers.1")} />
        </div> */}

        <div className="form-control">
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
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      style={{ marginTop: "20px" }}
                    >
                      -
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={() => append({ number: "" })}>
                +
              </button>
            </div>
          </div>
          <p className="error"></p>
        </div>

        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="text"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "Age is required",
              },
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="age">Date of birth</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              valueAsDate: true,
              required: {
                value: true,
                message: "Dob is required",
              },
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default EnhancedFormCopy;
