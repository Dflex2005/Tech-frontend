import axios from "axios"
import { useContext, useState } from "react"
import { Context } from "../../context/Context"
import "./Writejob"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import "./writejob.scss"
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


const Writejob = () => {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [summary, setSummary] = useState("")
    const {user} = useContext(Context)
  
 

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const newJob ={
            username:user.username,
            title,
            desc,
            summary,
        };
        
        try{
          const res =  await axios.post("/jobs", newJob);
          window.location.replace("/jobs/job/" + res.data._id)
          console.log(res);
        }catch(err){
            
        }
        
    }
  return (
    <div className="writejob">
            <form className="write-form">
                <div className="form-group"> 
                <input type="text" id="write-title" placeholder="job Title" onChange={(e)=>{setTitle(e.target.value)}} />
                </div>
            <div className="form-group">
                <textarea name="" id="write-summary" cols="40" rows="5" placeholder="write a summary...." onChange={(e)=>{setSummary(e.target.value)}}></textarea>
            </div>
            <div className="form-group">
                <ReactQuill value={desc} modules={modules}  formats={formats}  onChange={newValue => {setDesc(newValue)}} theme={'snow'} />
            </div>
            <button className="publish" onClick={handleSubmit}>Publish</button>
        </form>
    </div>
  )
}

export default Writejob