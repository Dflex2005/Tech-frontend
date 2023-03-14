import axios from 'axios';
import { useContext, useState } from 'react'
import { Context } from '../../../context/Context';
import "./settings.scss"

const Settings = () => {
    const {user, dispatch} = useContext(Context);
    const [file,setFile] = useState(null)
    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState(user.password)
    const [success, setSuccess] = useState(false);
    const PF = "http://localhost:5000/images/"


    const handleSubmit = async (e)=>{
        e.preventDefault();
        dispatch({type: "update_start"})
        const updatedUser ={
            userId:user._id,
            username,
            email,
            password,
        };
        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename)
            data.append("file", file)
            updatedUser.profilePic = filename;
            try{
                await axios.post("/upload", data)
                
            }catch(err){
    
            }
        }
        
        try{
         const res = await axios.put("/users/"+ user._id, updatedUser);
         setSuccess(true)
         dispatch({type: "update_success", payload: res.data})
        }catch(err){
            dispatch({type: "update_failure"})
        }
        
    }

    return (
      <div className="settings">
          <div className="wrapper">
              <div className="s-title">
                  <span className="u-title">Update Account</span>
                  <span className="d-title">Delete Account</span>
              </div>
              <form className="settingUpdate" onSubmit={handleSubmit}>
                  <label>Profile picture</label>
                  <div className="pics">
                      <img src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="" />
                      <label htmlFor="fileInput">add new</label>
                      <input type="file" id="fileInput" style={{display
                      :"none"}}  onChange={(e)=>{setFile(e.target.files[0])}} />
                  </div>
                  <label>Username</label>
                  <input type="text" placeholder={user.username} onChange={(e)=>{setUsername(e.target.value)}} />
                  <label>Email</label>
                  <input type="email" placeholder={user.email} onChange={(e)=>{setEmail(e.target.value)}} />
                  <label>Password</label>
                  <input type="password" placeholder='password' onChange={(e)=>{setPassword(e.target.value)}} />
                  <button className="settings" type='submit'>Update Profile</button>
              </form>
              {
                success && <span>Success</span>
              }
          </div>
      </div>
    )
  }
  

export default Settings