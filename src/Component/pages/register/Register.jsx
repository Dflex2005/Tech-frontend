import "./resgister.scss"
import { NavLink } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setError(false)
    try{

      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/dflexlogin")
    }catch (err){
      setError(true)
    }
  }
  return (
    <div className="register">
        <form className="loginUser" onSubmit={handleSubmit}>
            <input type="text" placeholder="username" onChange={e=>setUsername(e.target.value)} />

            <input type="email" placeholder="Enter your Email" onChange={e=>setEmail(e.target.value)} />

            <input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)} />

            <button className="register-btn" type="submit">Register</button>
        </form>
        <div className="reg">If you have an account already <span><button className="loginbtn"><NavLink to="/dflexlogin" >Login</NavLink></button></span></div>

        {error && <span>Something went wrong</span> }
    </div>
  )
}

export default Register