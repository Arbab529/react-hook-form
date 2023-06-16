import React from "react";
import { useForm } from "react-hook-form";

const YoutubeForm = () => {
  const form = useForm();
  const { register } = form;
  // const { name, ref, onChange, onBlur } = register("username");

  return (
    <div>
      <h1>Simple Form</h1>

      <form>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" {...register("username")} />
        {/* <input
          type="text"
          id="username"
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
        /> */}

        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" {...register("email")} />

        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" {...register("channel")} />

        <button>Submit</button>
      </form>
    </div>
  );
};

export default YoutubeForm;
