import React from 'react'
import { useForm } from 'react-hook-form'

const YoutubeForm = () => {
  return (
    <div>
      <h1>Simple Form</h1>

      <form>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />

        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" name="email" />

        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" name="channel" />

        <button>Submit</button>
      </form>
    </div>

  )
}

export default YoutubeForm