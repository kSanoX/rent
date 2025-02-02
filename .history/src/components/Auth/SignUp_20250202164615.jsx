import React, { useState } from 'react'

export const SignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [copyPassword, setCopyPassword] = useState("");

  return (
    <div>
        <h2>Create an account</h2>
        <form action="">
            <input type="email" />
            <input type="password" />
            <input type="password" />
        </form>
    </div>
  )
}
 
export default SignUp;
