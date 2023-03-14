import axios from "axios"
import { useContext, useRef } from "react"
import { Context } from "../../../context/Context"
import "./login.scss"

const Login = () => {
  const userRef = useRef()
  const passwordRef = useRef()
  const { dispatch, isFetching} = useContext(Context)
const handleSubmit = async (e)=>{
  e.preventDefault();
  dispatch({type:"login_start"})
  try{
    const res = await axios.post("/auth/login", {
      username: userRef.current.value,
      password: passwordRef.current.value
    })
    dispatch({type:"login_success", payload: res.data})
  }catch(err){
    dispatch({type:"login_failure"})
  }
  
}

  return (
    <div className="login">
        <form className="loginUser" onSubmit={handleSubmit}>
            <input type="text" ref={userRef} placeholder="Enter your username" />
            <input type="password" ref={passwordRef} placeholder="password" />
            <button className="login-btn" type="submit" disabled={isFetching}>Login</button>
        </form>
        <div className="reg">if you dont have an account <span><button className="regbtn">Register</button></span></div>
    </div>
  )
}

export default Login