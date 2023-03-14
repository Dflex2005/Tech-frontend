import { NavLink } from "react-router-dom"
import "./job.scss"

const Job = ({job}) => {
  return (
    <NavLink className="link" to={`job/${job._id}`}>
    <div className="job">
        <div className="title">
            {job.title}
        </div>
        <div className="content">{job.summary}</div>
    </div>
    </NavLink>
  )
}

export default Job