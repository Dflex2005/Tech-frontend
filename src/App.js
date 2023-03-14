import './App.css';
import './style.scss';
import Home from './Component/pages/home/Home';
import Single from './Component/pages/single/Single';
import  Header from "./Component/header/Header"
import Write from './Component/pages/write/Write';
import Settings from './Component/pages/settings/Settings';
import Login from "./Component/pages/login/Login"
import Register from "./Component/pages/register/Register"
import Jobs from "./Component/jobs/Jobs"
import Singlejob from "./Component/singleJob/Singlejob"
import Writejob from "./Component/writejob/Writejob"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useContext } from 'react';
import { Context } from './context/Context';

function App() {
  const {user} = useContext(Context);
  return (
    <Router>
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/jobs'  element={ <Jobs />}/>
        <Route path='/write'  element={user? <Write />:<Home />}/>
        <Route path='/writejob'  element={user? <Writejob />:<Jobs />}/>
        <Route path='/dflexlogin' element={user? <Home />:<Login />} />
        <Route path='/dflexregister' element={user? <Home />:<Register />} />
        <Route path='/settings' element={user? <Settings />: <Home />} />
        <Route path='/post/:postId'  element={<Single />}/>
        <Route path='/jobs/job/:postId'  element={<Singlejob />}/>
        <Route />

      </Routes>
    </div>
    </Router>
  );
}

export default App;
