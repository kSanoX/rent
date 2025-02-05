import React, { useState } from 'react'

export const SignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [copyPassword, setCopyPassword] = useState("");
    const [error, setError] = useState("");

    function register (e) {
        e.preventDefault();
        if(copyPassword !== password) {
            setError("Passwords didn`t match");
            return
        }
        creatUser

    }

  return (
    <div>
        <h2>Create an account</h2>
        <form onSubmit={register}>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
            <input value={copyPassword} onChange={(e) => setCopyPassword(e.target.value)} type="password" />
            <button>Create</button>
        </form>
    </div>
  )
}
 
export default SignUp;
