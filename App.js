import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {Cheatsheet, Login} from "./container";
import {Home, Usersidebar} from "./container";
import { Practice } from "./container";
import { Projects } from "./container";
import { Editor } from "./container";
import { Collaboration } from "./container";
import { Register } from "./container";
import { Profile } from "./container";
import { About } from "./container";
import { Dashboard } from "./container";
import { Users } from "./container";
import { Deactive } from "./container";
import { Backup } from "./container";


const App = () => {
  return (
    <div className="w-screen h-screen flex items-start justify-start overflow-hidden">
        <Routes>
       
        <Route path="/" element={<Home />}/>
           <Route path="/login" element={<Login/>} />
           <Route path="/register" element={<Register/>} />
           <Route path="/practice" element={<Practice />}/>
            <Route path="/projects" element={<Projects />}/>
            <Route path="/editor" element={<Editor/>}/>
           
           
            <Route path="/cheatsheet" element={<Cheatsheet/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/users" element={<Users/>}/>
            <Route path="/deactive" element={<Deactive/>}/>
            <Route path="/backup" element={<Backup/>}/>
            {/* <Route path="*" element={<Navigate to={"/home"} /> } /> */}
            
            
        </Routes>
        </div>
  );
};

export default App;