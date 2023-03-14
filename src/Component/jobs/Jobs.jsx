import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Job from "../job/Job"
import "./jobs.scss"

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const {search} = useLocation();
  
  
   
  
    useEffect(()=>{
      const fetchJobs = async ()=>{
       const res = await axios.get("/jobs" + search)
       await setJobs(res.data)
       console.log(res.data);
      
      }
      fetchJobs();
   
    
    },[search])
  return (
    <div className="jobs">
        {jobs.map(j =>{
           return <Job job={j} />
        })}
    </div>
  )
}

export default Jobs