import "./single.scss"
import { useLocation } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Context } from "../../../context/Context";



const Single = () => {
    const PF = "http://localhost:5000/images/"
    const {user} = useContext(Context)
    const location = useLocation()
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({})
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [updateMode, setUpdateMode] = useState(false)
    

    useEffect(()=>{
        const getPost = async ()=>{
            const res = await axios.get(`/posts/${path}`)
            setPost(res.data)
            setTitle(res.data.title)
            setDesc(res.data.desc)
        }

     
       getPost();
    },[path])

    const handleDelete = async ()=>{
        try{
            await axios.delete("/posts/"+ path , {data: {username:user.username}})
            window.location.replace("/");
        }catch(err){

        }
    }

    const handleUpdate = async()=>{
        try{
            await axios.put("/posts/"+ path , {
                username:user.username, 
                title, 
                desc
            })
            // window.location.reload();
            setUpdateMode(false)
        }catch(err){

        }
    }

  return (
    <div className="singlePost">
        <div className="top">
          {post.photo && (
              <div className="img-card">
              <img className="main-img" src={PF + post.photo} alt="" />
          </div>
          )}
            {
                    updateMode ? <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} /> :(
                        <div className="b-title">
              
                        <h1>{post.title}</h1>
                        {post.username === user?.username &&(
                            <div className="btn">
                                <button className="edit" onClick={()=>{setUpdateMode(true)}}>Edit</button>
                                <button className="del" onClick={handleDelete} >Del</button>
                            </div>
                        )}
                    </div> 
                    )
                }
          
        </div>

        <div className="b-info">
            <div className="author">Auhor: <NavLink className="link" to={`/?user=${post.username}`}>
                {post.username}
                </NavLink></div>
            <div className="date">{new Date(post.createdAt).toDateString()}</div>
        </div>

        {updateMode ? <textarea value={desc} onChange={(e)=>{setDesc(e.target.value)}} /> :(
            <p className="content" dangerouslySetInnerHTML={{__html:post.desc}} />
        )}
       {
        updateMode && (
            <button className="update" onClick={handleUpdate}>Update Post</button>
        )
       }
    </div>
  )
}

export default Single