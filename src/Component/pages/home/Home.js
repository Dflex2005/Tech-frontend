import {useState, useEffect} from "react";
import Posts from "../../posts/Posts"
import axios from "axios"
import { useLocation } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();


 

  useEffect(()=>{
    const fetchPost = async ()=>{
     const res = await axios.get("/posts" + search)
     await setPosts(res.data)
     console.log(res.data);
    
    }
    fetchPost();
 
    
  },[search])

  return (
    <>
    
    <Posts posts={posts} />
    </>
  )
}

export default Home