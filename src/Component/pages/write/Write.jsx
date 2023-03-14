import axios from "axios"
import { useContext, useState } from "react"
import { Context } from "../../../context/Context"
import "./write.scss"
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

const Write = () => {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [summary, setSummary] = useState("")
    const [file,setFile] = useState(null)
    const {user} = useContext(Context)
  
 

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const newPost ={
            username:user.username,
            title,
            desc,
            summary,
        };
        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename)
            data.append("file", file)
            newPost.photo = filename;
            try{
                await axios.post("/upload", data)
            }catch(err){
    
            }
        }
        
        try{
          const res =  await axios.post("/posts", newPost);
          window.location.replace("/post/" + res.data._id)
          console.log(res);
        }catch(err){
            
        }
        
    }


  return (
    <div className="write">
        {file && (
            <img className="write-img" src={URL.createObjectURL(file)} alt="" />
        )}
        

        <form className="write-form">
            <div className="form-group">
                <label htmlFor="fileInput">
                    <p>add</p>
                </label>
                <input type="file" id="fileInput" style={{display: "none"}} onChange={(e)=>{setFile(e.target.files[0])}} />
                <input type="text" id="write-title" placeholder="Blog Title" onChange={(e)=>{setTitle(e.target.value)}} />
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

export default Write