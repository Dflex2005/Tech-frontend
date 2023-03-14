import './posts.scss'
import Post from "../post/Post"

const Posts = ({posts}) => {

  return (
    <div className="container">
        {posts.map( (p) =>{
        return  <Post post={p} />
        })}
    </div>
  )
}

export default Posts