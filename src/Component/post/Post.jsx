import "./post.scss"
import {NavLink} from "react-router-dom"

const post = ({post}) => {
  const PF = "http://localhost:5000/images/"
  return (
    <NavLink className="link" to={`post/${post._id}`}>
    <div className="post">
      {
        post.photo && (
          <div className="img-card">
            <img src={PF + post.photo } alt="blog images" />
          </div>
        )
      }
      
      <div className="b-title">{post.title}</div>
      <div className="b-note">{post.summary}</div>
      <div className="date">{new Date(post.createdAt).toDateString()}</div>
    </div>
    </NavLink>

  )
}

export default post