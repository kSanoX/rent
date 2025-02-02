import React, { useState } from 'react'

export const SignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [copyPassword, setCopyPassword] = useState("");

  return (
    <div>
        <h2>Create an account</h2>
        <form action="">
            <input value={email} type="email" />
            <input value={password} type="password" />
            <input value={copyPassword} type="password" />
            <button>Create</button>
        </form>
    </div>
  )
}
 
export default SignUp;
