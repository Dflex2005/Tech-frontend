import './header.scss'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react';
import { Context } from '../../context/Context';

const Header = () => {
  const {user, dispatch} = useContext(Context);
  const PF = "http://localhost:5000/images/"

  const handleLogout = ()=>{
    dispatch({type:"logout"})
  }
  return (
    <header>
      <div className="container">
      <div className="left">
        <h1>Dflextech</h1>
      </div>
      <div className="mid">
        <ul className="links">
          <li className="list">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="list">
            <NavLink to="/about">About</NavLink>
          </li>
          <li className="list">
            <NavLink to="/write">{user && "Write" }</NavLink>
          </li>
          <li className="list" onClick={handleLogout}>
            {user && "Logout" }
          </li>
        </ul>
      </div>
      <div className="right">
        {
          user && (
            <NavLink to="/settings">
              <div className="img-card">
                <img src={PF + user.profilePic} alt="" />
              </div>
            </NavLink>            
              
          )
        }
      </div>
      </div>
    </header>
  )
}

export default Header