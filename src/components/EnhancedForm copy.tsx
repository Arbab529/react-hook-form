import {} from "react";
import { useForm } from "react-hook-form";
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
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  // const { name, ref, onChange, onBlur } = register("username");

  const onSubmit = (data: formValues) => {
    console.log("Form Submitted: ", data);
  };
  return (
    <div>
      <h1>Enhanced Form</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
        {/* <input
          type="text"
          id="username"
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
        /> */}

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

        <label htmlFor="social.facebook">Facebook</label>
        <input
          type="text"
          id="social.facebook"
          {...register("social.facebook")}
        />
        <p className="error"></p>

        <label htmlFor="social.twitter">Twitter</label>
        <input
          type="text"
          id="social.twitter"
          {...register("social.twitter")}
        />
        <p className="error"></p>

        <label htmlFor="primary-phone">Primary Phone Number</label>
        <input type="tel" id="primary-phone" {...register("phoneNumbers.0")} />
        <p className="error"></p>

        <label htmlFor="second-phone">Secondary Phone Number</label>
        <input type="tel" id="second-phone" {...register("phoneNumbers.1")} />

        <button>Submit</button> 
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default EnhancedFormCopy;
