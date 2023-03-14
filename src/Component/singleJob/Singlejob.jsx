import { useLocation } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import "./singlejob.scss"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

const Singlejob = () => {
    const {user} = useContext(Context)
    const location = useLocation()
    const path = location.pathname.split("/")[3];
    const [job, setJob] = useState({})
    const [title, setTitle] = useState("")
    const [summary, setSummary] = useState("")
    const [desc, setDesc] = useState("")
    const [updateMode, setUpdateMode] = useState(false)
    
    

    useEffect(()=>{
        const getJob = async ()=>{
            const res = await axios.get(`/jobs/${path}`)
            setJob(res.data)
            setTitle(res.data.title)
            setDesc(res.data.desc)
            setSummary(res.data.summary)
        }

     
       getJob();
    },[path])

    const handleDelete = async ()=>{
        try{
            await axios.delete("/jobs/"+ path , {data: {username:user.username}})
            window.location.replace("/jobs");
        }catch(err){

        }
    }

    const handleUpdate = async()=>{
        try{
            await axios.put("/jobs/"+ path , {
                username:user.username, 
                title, 
                desc,
                summary
            })
            window.location.reload();
            setUpdateMode(false)
        }catch(err){

        }
    }
  return (
    <div className="singlejob">
            {
                    updateMode ? <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} /> :(
                        <div className="b-title">
              
                        <h1>{job.title}</h1>
                        {job.username === user?.username &&(
                            <div className="btn">
                                <button className="edit" onClick={()=>{setUpdateMode(true)}}>Edit</button>
                                <button className="del" onClick={handleDelete} >Del</button>
                            </div>
                        )}
                    </div> 
                    )
                }
        <div className="b-info">
            <div className="date">{new Date(job.createdAt).toDateString()}</div>
        </div>

        {
            updateMode && (
                <textarea name="" id="write-summary" cols="40" rows="5" value={summary} placeholder="write a summary...." onChange={(e)=>{setSummary(e.target.value)}}></textarea>
            )
        }

        {updateMode ?  <ReactQuill value={desc} modules={modules}  formats={formats}  onChange={newValue => {setDesc(newValue)}} theme={'snow'} /> :(
            <p className="content" dangerouslySetInnerHTML={{__html:job.desc}} />
        )}
       {
        updateMode && (
            <button className="update" onClick={handleUpdate}>Update Post</button>
        )
       }
    </div>
  )
}

export default Singlejob